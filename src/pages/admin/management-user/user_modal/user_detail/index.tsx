import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import DialogWrapper from 'src/components/modal/dialog_wrapper';
import { MODAL_IDS } from 'src/constants';
import theme from 'src/theme';
import { IUser } from 'src/types/admin';
import BootstrapDialogTitle from 'src/components/modal/dialog_title';
import { useAppDispatch } from 'src/hooks';
import { closeModal } from 'src/redux_store/common/modal/modal_slice';

const UserDetailModal = ({ user }: { user: IUser }) => {
  const { name_role, id_user, address, fullName, email, logo, avatar } = user;
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(closeModal({ modalId: MODAL_IDS.userDetailModal }));
  };
  return (
    <DialogWrapper modalId={MODAL_IDS.userDetailModal} minWidth={400}>
      <Box p={1}>
        <BootstrapDialogTitle onClose={handleClose}>
          <Typography fontSize="16px">Thông tin người dùng</Typography>
        </BootstrapDialogTitle>
        <Box width="100px" height="100px" margin="auto" mt={1}>
          <Avatar
            src={logo || avatar}
            sx={{
              width: '100%',
              height: '100%',
            }}
          />
        </Box>
        <Box px={2}>
          <Typography
            fontSize="14px"
            color={theme.palette.primary.main}
            fontWeight="600"
            my={2}
          >
            Người dùng:{' '}
            <strong
              style={{
                color: theme.palette.common.black,
              }}
            >
              {fullName}
            </strong>
          </Typography>
          <Typography
            fontSize="14px"
            color={theme.palette.primary.main}
            fontWeight="600"
            my={2}
          >
            Vai trò:{' '}
            <strong
              style={{
                color: theme.palette.common.black,
              }}
            >
              {name_role}
            </strong>
          </Typography>
          <Typography
            fontSize="14px"
            color={theme.palette.primary.main}
            fontWeight="600"
            my={2}
          >
            Emai:{' '}
            <strong
              style={{
                color: theme.palette.common.black,
              }}
            >
              {email}
            </strong>
          </Typography>
        </Box>
      </Box>
    </DialogWrapper>
  );
};

export default UserDetailModal;
