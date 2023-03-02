import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ProfileHeader from '../header';
import EmptyData from 'src/components/empty_data';

const JobApplied = () => {
  return (
    <Box>
      <ProfileHeader />
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
          <EmptyData title="Bạn chưa có ứng tuyển việc làm nào." />
        </Box>
      </Paper>
    </Box>
  );
};

export default JobApplied;
