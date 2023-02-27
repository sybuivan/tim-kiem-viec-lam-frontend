import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ProfileHeader from '../header';
import { JobCompany } from 'src/components/job_company';

const JobSaved = () => {
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
            Việc làm đã lưu
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
          <JobCompany isSave={true} />
          <JobCompany isSave={true} />
          <JobCompany isSave={true} />
        </Box>
      </Paper>
    </Box>
  );
};

export default JobSaved;
