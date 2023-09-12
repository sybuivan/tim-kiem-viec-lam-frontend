import React from 'react';
import { Box, Paper, Typography, Grid } from '@mui/material';
import ProfileHeader from '../../../components/profile_bar/header';
import EmptyData from 'src/components/empty_data';
import JobSave from './job';
import { useAppSelector } from 'src/hooks';
import theme from 'src/theme';

const JobApplied = () => {
  const {
    applyList: { data },
  } = useAppSelector((state) => state.applySlice);
  const { me } = useAppSelector((state) => state.authSlice);

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
            Việc làm đã ứng tuyển
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
          <Grid
            container
            sx={{
              borderBottom: '1px solid #adbebf',
              py: 2,
              mb: 1,
              textAlign: 'center',
              [theme.breakpoints.down('md')]: {
                display: 'none',
              },
            }}
          >
            <Grid item lg={4} md={4}>
              <Typography fontWeight="600">Tên việc làm</Typography>
            </Grid>
            <Grid item lg={2} md={2}>
              <Typography fontWeight="600" textAlign="center">
                Hồ sơ ứng tuyển
              </Typography>
            </Grid>
            <Grid item lg={2} md={2}>
              Ngày nộp
            </Grid>
            <Grid item lg={2} md={2}>
              Hạn Nộp
            </Grid>
            <Grid item lg={2} md={2}>
              Trạng thái
            </Grid>
          </Grid>
          {data.length > 0 ? (
            data.map((job) => <JobSave job={job} key={job.id_job} />)
          ) : (
            <EmptyData title="Bạn chưa có ứng tuyển việc làm nào." />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default JobApplied;
