import {
  TableCell,
  Typography,
  TableRow,
  Tooltip,
  IconButton,
  Avatar,
} from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { PreviewOutlined, LockOpenOutlined } from '@mui/icons-material';
import React from 'react';

import { IUser } from 'src/types/admin';
import theme from 'src/theme';
import { useAppDispatch } from 'src/hooks';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import { MODAL_IDS } from 'src/constants';
import UserDetailModal from '../user_modal/user_detail';
import UserLockModal from '../user_modal/user_lock';

const UserItem = ({ user }: { user: IUser }) => {
  const {
    email,
    fullName,
    address,
    avatar,
    id_user,
    name_role,
    logo,
    is_lock,
  } = user;
  const dispatch = useAppDispatch();

  const handleOpenUserDetailModal = () => {
    dispatch(
      openModal({
        modalId: MODAL_IDS.userDetailModal,
        dialogComponent: <UserDetailModal user={user} />,
      })
    );
  };

  const handleOpenUserLockModal = () => {
    dispatch(
      openModal({
        modalId: MODAL_IDS.userLockModal,
        dialogComponent: (
          <UserLockModal
            id_user={id_user}
            title={
              is_lock === 1
                ? 'Bạn có mở khóa người dùng này không?'
                : 'Bạn có muốn khóa người dùng này không?'
            }
            is_lock={is_lock === 0 ? 1 : 0}
          />
        ),
      })
    );
  };

  return (
    <TableRow hover>
      <TableCell
        sx={{
          maxWidth: '200px',
        }}
      >
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          noWrap
        >
          {fullName}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          noWrap
        >
          {email}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" color="text.secondary" noWrap>
          {address}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography
          variant="body1"
          fontWeight="bold"
          color="text.primary"
          gutterBottom
          noWrap
        >
          {name_role}
        </Typography>
      </TableCell>
      <TableCell>
        <Avatar src={avatar || logo} />
      </TableCell>
      <TableCell align="right">
        <Tooltip title="Xem chi tiết" arrow>
          <IconButton
            sx={{
              color: theme.palette.primary.main,
            }}
            color="inherit"
            size="small"
            onClick={handleOpenUserDetailModal}
          >
            <PreviewOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Chỉnh sửa" arrow>
          <IconButton
            sx={{
              '&:hover': {},
              color: theme.palette.primary.main,
            }}
            color="inherit"
            size="small"
          >
            <EditTwoToneIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={is_lock === 0 ? 'Khóa người dùng' : 'Mở khóa '} arrow>
          <IconButton
            sx={{
              color:
                is_lock === 0
                  ? theme.palette.success.main
                  : theme.palette.error.main,
            }}
            color="inherit"
            size="small"
            onClick={handleOpenUserLockModal}
          >
            <LockOpenOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default UserItem;
