import { Box, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import { JobCompany } from 'src/components/job_company';
import { useAppSelector } from 'src/hooks';

const JobList = () => {
  const {
    companyDetail: { jobs },
  } = useAppSelector((state) => state.companySlice);
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
            {jobs.length > 0 ? (
              jobs.map((job) => <JobCompany job={job} key={job.id_job} />)
            ) : (
              <Typography
                fontWeight="00"
                fontSize="18px"
                mb={2}
                textAlign="center"
              >
                Chưa có vị trí đang tuyển
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};

export default JobList;
