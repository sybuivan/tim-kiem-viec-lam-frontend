import { Box, Avatar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { setUserRoom } from 'src/redux_store/chat/chat_slices';
import theme from 'src/theme';
import { IRoom } from 'src/types/chat';
import { getSubTimeFromDayFNS } from 'src/utils/function';

export const MessageCard = ({ room }: { room: IRoom }) => {
  const { fullName, id_room, message, created_at, avatar, name_job, logo } =
    room;
  const { me } = useAppSelector((state) => state.authSlice);
  const {
    messageList: { messages },
  } = useAppSelector((state) => state.chatSlice);

  const { id_room_message } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  console.log({ created_at });
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
        src={avatar || logo}
        sx={{ width: '50px', height: '50px', mr: 2 }}
      />
      <Box>
        <Box display="flex" alignItems="center">
          <Typography
            sx={{
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              fontSize: '15px',
              margin: 0,
              minWidth: '200px',
              maxWidth: '200px',
            }}
            title={fullName}
          >
            {fullName}
          </Typography>

          <Typography sx={{ color: theme.palette.grey[600], px: 1 }}>
            -
          </Typography>
          <Typography
            sx={{ color: theme.palette.primary.main }}
            fontWeight="600"
            fontSize="12px"
          >
            {getSubTimeFromDayFNS(created_at)}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontWeight: '600',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            fontSize: '15px',
            margin: 0,
            color: theme.palette.grey[800],
            minWidth: '200px',
            maxWidth: '200px',
          }}
          title={name_job}
        >
          Tên việc: {name_job}
        </Typography>
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
            {/* {!messages[messages.length - 1]?.message
              ? message
              : messages[messages.length - 1]?.message} */}
            {message}
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};
