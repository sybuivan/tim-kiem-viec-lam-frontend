import {
  BadgeOutlined,
  EmailOutlined,
  FavoriteBorder,
  FavoriteRounded,
  LocalPhoneOutlined,
  PreviewOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import {
  followUser,
  unfollowUser,
} from 'src/redux_store/company/company_action';
import theme from 'src/theme';
import { ICandidate } from 'src/types/company';
import { checkIsFollow } from 'src/utils/common';
import { toastMessage } from 'src/utils/toast';
import ProfileUserModal from '../profile_user_modal';

export const CandidateInfo = ({ candidate }: { candidate: ICandidate }) => {
  const dispatch = useAppDispatch();
  const {
    me,
    followList: { followers },
  } = useAppSelector((state) => state.companySlice);

  const { phone, name_field, email, file_cv, fullName, avatar, id_user } =
    candidate;
  const handleUnFollow = () => {
    dispatch(
      unfollowUser({
        id_user,
        id_company: me.id_company,
      })
    )
      .unwrap()
      .then(() => {
        toastMessage.success(`Bỏ lưu ứng viên ${fullName} thành công`);
      });
  };
  const handleFollow = () => {
    dispatch(
      followUser({
        id_user,
        id_company: me.id_company,
      })
    )
      .unwrap()
      .then(() => {
        toastMessage.success(`Lưu ứng viên ${fullName} thành công`);
      });
  };

  const handleOpenModal = () => {
    dispatch(
      openModal({
        modalId: MODAL_IDS.profileUserModal,
        dialogComponent: <ProfileUserModal id_user={id_user} />,
      })
    );
  };

  return (
    <Grid item xs={4}>
      <Box
        sx={{
          boxShadow: ' rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
          p: 2,

          borderRadius: '6px',
        }}
      >
        <img
          style={{
            borderRadius: '50%',
            width: '100px',
            height: '100px',
            display: 'flex',
            margin: '8px auto',
          }}
          src={avatar}
          alt={fullName}
        />
        <Box
          sx={{
            '& svg': {
              fontSize: '18px',
              color: theme.palette.primary.main,
            },
            pl: 3,
          }}
        >
          <Box display="flex" gap={0.5}>
            <BadgeOutlined />
            <Typography>Họ và tên: </Typography>
            <Typography fontWeight="600">{fullName}</Typography>
          </Box>
          <Box display="flex" gap={0.5}>
            <LocalPhoneOutlined />
            <Typography>Số điện thoại: </Typography>
            <Typography fontWeight="600">{phone}</Typography>
          </Box>
          <Box display="flex" gap={0.5}>
            <EmailOutlined />
            <Typography>Gmail: </Typography>
            <Typography fontWeight="600">{email}</Typography>
          </Box>
          <Box display="flex" gap={0.5}>
            <WorkOutlineOutlined />
            <Typography>Nghề nghiệp: </Typography>
            <Typography fontWeight="600">{name_field}</Typography>
          </Box>

          <Box display="flex" gap={0.5} mt={1}>
            {checkIsFollow(followers, id_user) ? (
              <Button
                variant="outlined"
                startIcon={<FavoriteRounded />}
                onClick={handleUnFollow}
              >
                Hủy theo dõi
              </Button>
            ) : (
              <Button
                variant="outlined"
                startIcon={<FavoriteBorder />}
                onClick={handleFollow}
              >
                Theo dõi
              </Button>
            )}
            <Button
              variant="outlined"
              startIcon={<PreviewOutlined />}
              onClick={handleOpenModal}
            >
              Xem chi tiết
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
