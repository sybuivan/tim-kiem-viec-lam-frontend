import React from 'react';
import { Box, List, ListItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { MessageCard } from '../message_card';
import theme from 'src/theme';
import Scrollbars from 'react-custom-scrollbars-2';
import { useAppSelector } from 'src/hooks';

export const SideBar = () => {
  const {
    roomList: { rooms },
  } = useAppSelector((state) => state.chatSlice);

  return (
    <Box sx={{ borderRight: '1px solid #c1c1c1', height: '100%' }}>
      <Box
        sx={{
          borderBottom: '1px solid #c1c1c1',
          fontSize: '16px',
          fontWeight: '600',
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: theme.palette.primary.main,
        }}
      >
        Danh sách tin nhắn
      </Box>

      <List sx={{ height: '100vh' }}>
        <Scrollbars>
          {rooms.map((room) => (
            <MessageCard key={room.id_room} room={room} />
          ))}
        </Scrollbars>
      </List>
    </Box>
  );
};
