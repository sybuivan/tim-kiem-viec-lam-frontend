import React from 'react';
import { Popover, Box, IconButton, Typography } from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
import CircleIcon from '@mui/icons-material/Circle';
import Scrollbars from 'react-custom-scrollbars-2';
import { useNavigate } from 'react-router-dom';
import theme from 'src/theme';
import { getSubTimeFromDayFNS } from 'src/utils/function';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import {
  deleteNotification,
  updateNotification,
} from 'src/redux_store/user/user_action';
import { INotification } from 'src/types/user';
import ProfileUserModal from 'src/pages/home_company/saved_profile/profile_user_modal';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import { MODAL_IDS } from 'src/constants';

export const NotificationItem = ({ notifi }: { notifi: INotification }) => {
  const {
    content,
    id_notification,
    status,
    id_job,
    id_user_follow,
    created_at,
    type_notification,
  } = notifi;
  const { me } = useAppSelector((state) => state.authSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    if (type_notification === 'job') {
      navigate(`/viec-lam/${id_job}`);
    } else if (type_notification === 'follow' && id_user_follow) {
      if (me.id_role === 'user') {
        navigate(`/cong-ty/${id_user_follow}`);
      } else {
        dispatch(
          openModal({
            modalId: MODAL_IDS.profileUserModal,
            dialogComponent: <ProfileUserModal id_user={id_user_follow} />,
          })
        );
      }
    } else {
      navigate('/');
    }

    if (status === 0) {
      dispatch(updateNotification(id_notification));
    }
  };

  const handleDeleteNofitication = () => {
    dispatch(deleteNotification(id_notification));
  };
  return (
    <Box position="relative">
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          pl: 6,
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
          position="absolute"
          top="50%"
          sx={{
            transform: 'translateY(-50%)',
            right: '10px',
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
      <IconButton
        size="small"
        title="Xóa"
        onClick={handleDeleteNofitication}
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          left: '10px',
        }}
      >
        <CloseOutlined />
      </IconButton>
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
