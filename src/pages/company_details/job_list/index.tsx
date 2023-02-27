import { Box, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { JobCompany } from 'src/components/job_company';

const JobList = () => {
  return (
    <Paper
      sx={{
        p: 1,
        mt: '40px',
      }}
    >
      <Container
        sx={{
          maxWidth: '1000px!important',
        }}
      >
        <Box my={2}>
          <Typography fontWeight="600" fontSize="24px" mb={2}>
            Vị trí đang tuyển
          </Typography>

          <Box>
            <JobCompany />
            <JobCompany />
            <JobCompany />
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};

export default JobList;
