import React from 'react';
import { Popover, Box, IconButton, Typography } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import Scrollbars from 'react-custom-scrollbars-2';
import theme from 'src/theme';
import { getSubTimeFromDayFNS } from 'src/utils/function';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import { updateNotification } from 'src/redux_store/user/user_action';
import { INotification } from 'src/types/user';

export const NotificationItem = ({ notifi }: { notifi: INotification }) => {
  const { content, id_notification, status, created_at } = notifi;
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(updateNotification(id_notification));
  };
  return (
    <Box
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 1,
        py: 1.5,
        background:
          status === 0 ? theme.palette.grey[200] : theme.palette.common.white,
        borderBottom: '1px solid #c1c1c1',
        '&:hover': {
          background: theme.palette.grey[200],
          cursor: 'pointer',
        },
      }}
      title={status === 0 ? 'Chưa đọc' : 'Đã đọc'}
    >
      <IconButton size="small">
        <CloseOutlined />
      </IconButton>
      <Box>
        <Typography>{content}</Typography>
        <Typography
          sx={{ color: theme.palette.primary.main }}
          fontWeight="600"
          fontSize="12px"
        >
          {getSubTimeFromDayFNS(created_at)}
        </Typography>
      </Box>
    </Box>
  );
};

const Notification = ({
  id,
  open,
  handleClose,
  anchorEl,
}: {
  anchorEl: HTMLButtonElement | null;
  id?: string;
  open: boolean;
  handleClose: () => void;
}) => {
  const { notification } = useAppSelector((state) => state.userSlice);

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      {notification.notificationList?.length > 0 ? (
        <Box
          sx={{
            maxHeight: '300px',
            width: '320px',
            height: notification.notificationList?.length * 70,
          }}
        >
          <Scrollbars>
            <Box>
              {notification.notificationList.map((notifi) => (
                <NotificationItem
                  notifi={notifi}
                  key={notifi.id_notification}
                />
              ))}
            </Box>
          </Scrollbars>
        </Box>
      ) : (
        <Typography
          sx={{ width: '320px', p: 2, textAlign: 'center' }}
          color={theme.palette.primary.main}
        >
          Không có thông báo nào
        </Typography>
      )}
    </Popover>
  );
};

export default Notification;
