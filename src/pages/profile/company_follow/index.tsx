import React, { useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ProfileHeader from '../../../components/profile_bar/header';
import Company from './company';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import EmptyData from 'src/components/empty_data';
import { getAllFollowUser } from 'src/redux_store/user/user_action';

const CompanyFollow = () => {
  const {
    me,
    followList: { followers },
  } = useAppSelector((state) => state.userSlice);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllFollowUser(me?.id_user));
  }, []);
  return (
    <Box>
      <ProfileHeader fullName={me.fullName} />
      <Paper>
        <Box
          p={2}
          sx={{
            borderBottom: '1px solid #adbebf',
          }}
        >
          <Typography fontSize="18px" fontWeight="600">
            Nhà tuyển dụng đang theo dõi
          </Typography>
        </Box>
        <Box
          sx={{
            p: 2,
          }}
        >
          <Box
            display="flex"
            gap={5}
            sx={{
              borderBottom: '1px solid #adbebf',
              py: 2,
              mb: 2,
            }}
          >
            <Box flex="0.5">
              <Typography fontWeight="600">Công ty</Typography>
            </Box>
            <Box flex="0.2">
              <Typography fontWeight="600" textAlign="center">
                Đang tuyển
              </Typography>
            </Box>
            <Box flex="0.35" fontWeight="600">
              Ngày theo dõi
            </Box>
          </Box>
          {followers.length > 0 ? (
            followers.map((item) => <Company company={item} />)
          ) : (
            <EmptyData title="Bạn theo dõi nhà tuyển dụng nào" />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default CompanyFollow;
