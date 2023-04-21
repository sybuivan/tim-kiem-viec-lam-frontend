import React from 'react';
import { Popover, Box, IconButton, Typography } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import CircleIcon from '@mui/icons-material/Circle';
import Scrollbars from 'react-custom-scrollbars-2';
import theme from 'src/theme';
import { getSubTimeFromDayFNS } from 'src/utils/function';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import {
  deleteNotification,
  updateNotification,
} from 'src/redux_store/user/user_action';
import { INotification } from 'src/types/user';

export const NotificationItem = ({ notifi }: { notifi: INotification }) => {
  const { content, id_notification, status, created_at } = notifi;
  const dispatch = useAppDispatch();
  const handleClick = () => {
    if (status === 0) {
      dispatch(updateNotification(id_notification));
    }
  };

  const handleDeleteNofitication = () => {
    dispatch(deleteNotification(id_notification));
  };
  return (
    <Box
      onClick={handleClick}
      position="relative"
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
      <IconButton size="small" title="Xóa" onClick={handleDeleteNofitication}>
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
      <Box       
        position="absolute" top="50%" sx={{
          transform:"translateY(-50%)",
          right:"10px"
        }}
      >
        {status === 0 && (
          <CircleIcon
            fontSize="small"
            sx={{
              color: theme.palette.primary.main,
              fontSize: '14px',
            }}
          />
        )}
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

  const renderNotification = () => {
    if (notification.notificationList?.length <= 3)
      return (
        <Box
          sx={{
            maxHeight: '300px',
            width: '320px',
          }}
        >
          <Box>
            {notification.notificationList.map((notifi) => (
              <NotificationItem notifi={notifi} key={notifi.id_notification} />
            ))}
          </Box>
        </Box>
      );
    return (
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
              <NotificationItem notifi={notifi} key={notifi.id_notification} />
            ))}
          </Box>
        </Scrollbars>
      </Box>
    );
  };

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
        renderNotification()
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
