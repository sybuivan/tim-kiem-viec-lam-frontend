import { SendOutlined } from '@mui/icons-material';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';

import { FormInputBase } from 'src/components/hook_form/form_input_base';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { createMessage, getMessages } from 'src/redux_store/chat/chat_actions';
import { setMessageList, changeRoom } from 'src/redux_store/chat/chat_slices';
import theme from 'src/theme';
import { useStyles } from './styles';

export const ContentMessage = ({ socket }: { socket: any }) => {
  const { id_room_message } = useParams();
  const {
    messageList: { messages, room },
  } = useAppSelector((state) => state.chatSlice);
  const { me } = useAppSelector((state) => state.companySlice);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    resetField,
    formState: { isSubmitting },
  } = useForm<{ message: '' }>({
    defaultValues: {
      message: '',
    },
  });

  useEffect(() => {
    if (id_room_message) {
      dispatch(
        getMessages({
          id_room: id_room_message,
          id_role: me?.id_role,
        })
      );
    }
  }, [id_room_message]);

  useEffect(() => {
    socket.on('new-message', ({ message }: any) => {
      console.log({ message });
      dispatch(changeRoom(message));
      dispatch(setMessageList(message));
    });

    return () => {
      socket.off('new-message');
    };
  }, [socket, messages]);

  const handleSentMessage = async ({ message }: { message: string }) => {
    const { id_company, id_user, fullName, id_room } = room;
    console.log({
      fullName,
      id_room,
      id_user,
    });
    if (id_room && fullName)
      dispatch(
        createMessage({
          id_company,
          id_room,
          id_user,
          message,
          sender: me?.id_role,
        })
      )
        .unwrap()
        .then(() => {
          resetField('message');
        });
  };

  const classes = useStyles();
  return (
    <Box sx={{ height: '100%' }} className={classes.root}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #c1c1c1',
          padding: '0 8px',
          height: ' 60px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& h5': { fontWeight: '600' },
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src={room.avatar}
            sx={{ width: '40px', height: '40px', mr: 2 }}
          />
          <Typography fontSize="16px" fontWeight="600">
            {room.fullName}
          </Typography>
        </Box>
      </Box>

      {/* Content messages */}
      <Box className={classes.boxContent}>
        <Box width="98%" mt={2} ml="14px" height="84%">
          <Scrollbars>
            {messages.map((message) => (
              <Box
                className={
                  message.sender === me.id_role ? classes.user : classes.client
                }
                key={message.id_chat}
              >
                <Typography className={classes.textMessage}>
                  {message.message}
                </Typography>
              </Box>
            ))}
          </Scrollbars>
        </Box>
      </Box>

      <Box
        className={classes.formChat}
        component="form"
        onSubmit={handleSubmit(handleSentMessage)}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          width="88%"
          sx={{
            padding: '8px 0',
            border: '1px solid #c1c1c1',
            borderRadius: '16px',
            ml: '10px',
          }}
        >
          <FormInputBase
            control={control}
            name="message"
            placeholder="Nhập tin nhắn"
          />
          <Box sx={{ '& svg': { fontSize: '24px' } }}>
            <IconButton onClick={handleSubmit(handleSentMessage)}>
              <SendOutlined
                sx={{
                  color: theme.palette.primary.main,
                }}
              />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
