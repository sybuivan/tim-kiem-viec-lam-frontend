import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import EmptyData from 'src/components/empty_data';
import ProfileHeader from 'src/components/profile_bar/header';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { getAllFolllowUser } from 'src/redux_store/company/company_action';
import { CandidateInfo } from './candidate_info';

const SavedProfile = () => {
  const dispatch = useAppDispatch();
  const {
    followList: { followers, total },
  } = useAppSelector((state) => state.companySlice);

  const { me } = useAppSelector((state) => state.authSlice);

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

export default SavedProfile;
