import React, { useEffect } from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import ProfileHeader from '../../../components/profile_bar/header';
import Company from './company';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import EmptyData from 'src/components/empty_data';
import { getAllFollowUser } from 'src/redux_store/user/user_action';
import theme from 'src/theme';

const CompanyFollow = () => {
  const {
    followList: { followers },
  } = useAppSelector((state) => state.userSlice);
  const { me } = useAppSelector((state) => state.authSlice);

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
          <Grid
            container
            sx={{
              borderBottom: '1px solid #adbebf',
              py: 2,
              mb: 2,
              textAlign: 'center',
              [theme.breakpoints.down('md')]: {
                display: 'none',
              },
            }}
          >
            <Grid item lg={6} md={6}>
              <Typography fontWeight="600">Công ty</Typography>
            </Grid>
            <Grid item lg={2} md={2}>
              <Typography fontWeight="600" textAlign="center">
                Đang tuyển
              </Typography>
            </Grid>
            <Grid item lg={4} md={4} fontWeight="600">
              Ngày theo dõi
            </Grid>
          </Grid>
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
