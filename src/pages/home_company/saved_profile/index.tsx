import React, { useEffect } from 'react';
import { Box, Button, Link, Paper, Typography, Grid } from '@mui/material';
import {
  FavoriteRounded,
  FavoriteBorder,
  LocalPhoneOutlined,
  BadgeOutlined,
  EmailOutlined,
  AssignmentOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import ProfileHeader from 'src/components/profile_bar/header';
import EmptyData from 'src/components/empty_data';
import theme from 'src/theme';
import {
  followUser,
  getAllFolllowUser,
  unfollowUser,
} from 'src/redux_store/company/company_action';
import { toastMessage } from 'src/utils/toast';
import { ICandidate } from 'src/types/company';
import { checkIsFollow } from 'src/utils/common';

const SavedProfile = () => {
  const dispatch = useAppDispatch();
  const {
    me,
    followList: { followers, total },
  } = useAppSelector((state) => state.companySlice);

  useEffect(() => {
    dispatch(getAllFolllowUser(me.id_company));
  }, []);

  return (
    <Box>
      <ProfileHeader fullName="Hồ sơ ứng viên đã lưu" title="" />
      <Paper>
        <Box
          p={2}
          sx={{
            borderBottom: '1px solid #adbebf',
          }}
        >
          <Typography fontSize="18px" fontWeight="600">
            Danh sách ứng viên
          </Typography>
        </Box>

        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Grid container columnSpacing={1}>
            {followers.length > 0 ? (
              followers.map((candidate) => (
                <CandidateInfo candidate={candidate} key={candidate.file_cv} />
              ))
            ) : (
              <EmptyData title="Bạn chưa lưu ứng viên nào" />
            )}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

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
          <Box display="flex" gap={0.5}>
            <AssignmentOutlined />
            <Typography>CV:</Typography>{' '}
            <Link href={file_cv} target="_blank">
              Xem hồ sơ
            </Link>
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
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default SavedProfile;
