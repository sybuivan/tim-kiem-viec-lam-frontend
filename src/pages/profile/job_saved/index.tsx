import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useAppSelector } from 'src/hooks';
import ProfileHeader from '../header';
import { JobCompany } from 'src/components/job_company';
import EmptyData from 'src/components/empty_data';

const JobSaved = () => {
  const {
    saveJobList: { savedList },
  } = useAppSelector((state) => state.userSlice);
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
          {savedList.length > 0 ? (
            <>
              {savedList.map((job) => (
                <JobCompany job={job} key={job.id_job} />
              ))}
            </>
          ) : (
            <EmptyData title="Bạn chưa có việc làm đã lưu" />
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default JobSaved;
