import React from 'react';
import { Box, List, Typography } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { MessageCard } from '../message_card';
import theme from 'src/theme';
import Scrollbars from 'react-custom-scrollbars-2';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import IconButtonTooltip from 'src/components/icon_button_tooltip';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import { MODAL_IDS } from 'src/constants';
import UserModal from '../user_modal';

export const SideBar = () => {
  const dispatch = useAppDispatch();
  const {
    roomList: { rooms },
  } = useAppSelector((state) => state.chatSlice);
  const handleClick = () => {
    dispatch(
      openModal({
        modalId: MODAL_IDS.userMessage,
        dialogComponent: <UserModal />,
      })
    );
  };
  return (
    <Box
      sx={{ borderRight: '1px solid #c1c1c1', height: '100%' }}
      position="relative"
    >
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
        {/* <Box ml={4}>
          <IconButtonTooltip
            onClick={handleClick}
            title="Thêm tin nhắn"
            icon={<AddOutlinedIcon fontSize="large" />}
            size="small"
            style={{ color: theme.palette.primary.main }}
          />
        </Box> */}
      </Box>

      <List sx={{ height: '100vh' }}>
        <Scrollbars>
          {rooms.length > 0 ? (
            rooms.map((room) => <MessageCard key={room.id_room} room={room} />)
          ) : (
            <Typography
              fontSize="16px"
              textAlign="center"
              color={theme.palette.error.main}
            >
              Chưa có tin nhắn nào
            </Typography>
          )}
        </Scrollbars>
      </List>
    </Box>
  );
};
