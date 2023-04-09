import { Box, Avatar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { setUserRoom } from 'src/redux_store/chat/chat_slices';
import theme from 'src/theme';
import { IRoom } from 'src/types/chat';

export const MessageCard = ({ room }: { room: IRoom }) => {
  const { fullName, id_room } = room;
  const { me } = useAppSelector((state) => state.userSlice);
  const {
    messageList: { messages },
  } = useAppSelector((state) => state.chatSlice);
  const { id_room_message } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOnClick = () => {
    if (me.id_role === 'user') {
      navigate(`/users/message/${id_room}`);
      dispatch(setUserRoom(room));
    } else {
      navigate(`/company/message/${id_room}`);
      dispatch(setUserRoom(room));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '8px',
        marginTop: '4px',
        userSelect: 'none',
        background:
          id_room === id_room_message
            ? theme.palette.grey[200]
            : theme.palette.common.white,
        '&:hover': {
          background: theme.palette.grey[200],
          transition: 'all 0.4s',
        },
      }}
      onClick={handleOnClick}
    >
      <Avatar
        alt="Remy Sharp"
        src={`http://localhost:5000/v1/}`}
        sx={{ width: '50px', height: '50px', mr: 2 }}
      />
      <Box>
        <Typography sx={{ fontWeight: '600', pb: 1 }}>{fullName}</Typography>
        <Typography
          sx={{
            display: 'flex',
          }}
        >
          <Typography
            // title={messages[messages.length - 1]?.message}
            sx={{
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              fontSize: '15px',
              margin: 0,
              width: '240px',
            }}
          >
            {messages[messages.length - 1]?.message}
          </Typography>
          <Typography sx={{ color: theme.palette.grey[600], p: '0 1rem' }}>
            -
          </Typography>
          <Typography
            sx={{ color: theme.palette.primary.main }}
            fontWeight="600"
          >
            1 giờ
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};
