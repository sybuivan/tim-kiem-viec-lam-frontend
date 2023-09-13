import { SendOutlined } from '@mui/icons-material';
import { Avatar, Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { FormTextarea } from 'src/components/hook_form';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { baseURL } from 'src/config';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch } from 'src/hooks';
import { createNewMessage } from 'src/redux_store/chat/chat_actions';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';
import theme from 'src/theme';
import { IMessageJob } from 'src/types/chat';

const MessageJob = ({ job }: { job: IMessageJob }) => {
  const { id_user, id_company, id_job, logo, name_company, name_job } = job;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: {
      message: '',
    },
  });

  const handleOnSubmit = ({ message }: { message: string }) => {
    dispatch(
      createNewMessage({
        id_company: id_company,
        id_user: id_user,
        message,
        sender: 'user',
        id_job: id_job,
      })
    )
      .unwrap()
      .then((data) => {
        dispatch(closeModal({ modalId: MODAL_IDS.messageJob }));
        navigate(`/users/message/${data.message.id_room}`);
      });
  };

  return (
    <DialogWrapper
      modalId={MODAL_IDS.messageJob}
      sx={{
        [theme.breakpoints.up('md')]: {
          minWidth: 500,
        },
        [theme.breakpoints.down('sm')]: {
          minWidth: '100%',
        },
      }}
    >
      <Box p={1}>
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          justifyContent="space-between"
          mb={1}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 8px',
              height: ' 60px',
              width: '100%',
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
                src={`${baseURL}/${logo}`}
                sx={{
                  width: '60px',
                  height: '60px',
                  mr: 2,
                  border: '1px solid #c1c1c1',
                }}
              />
              <Box>
                <Typography fontWeight="600">{name_company}</Typography>
                <Typography>{name_job}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box>
          <FormTextarea
            name="message"
            control={control}
            minRows={10}
            placeholder="Nhập nội dung tin nhắn"
          />

          <Box display="flex" justifyContent="flex-end" my={1}>
            <Button
              variant="contained"
              disabled={!dirtyFields.message}
              onClick={handleSubmit(handleOnSubmit)}
              endIcon={
                <SendOutlined
                  sx={{
                    color: theme.palette.common.white,
                  }}
                />
              }
              sx={{
                '&:hover': {
                  background: theme.palette.primary.main,
                },
              }}
            >
              Gửi tin nhắn
            </Button>
          </Box>
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default MessageJob;
