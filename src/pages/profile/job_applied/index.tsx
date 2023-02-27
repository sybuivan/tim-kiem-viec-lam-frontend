import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ProfileHeader from '../header';

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
      </Paper>
    </Box>
  );
};

export default JobApplied;
