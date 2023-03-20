import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ProfileHeader from '../../../components/profile_bar/header';
import EmptyData from 'src/components/empty_data';
import JobSave from './job';
import { useAppSelector } from 'src/hooks';

const JobApplied = () => {
  const {
    applyList: { data },
  } = useAppSelector((state) => state.applySlice);
  const { me } = useAppSelector((state) => state.companySlice);
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
          <Box
            display="flex"
            gap={5}
            sx={{
              borderBottom: '1px solid #adbebf',
              py: 2,
              mb: 1,
            }}
          >
            <Box flex="0.5" minWidth="340px">
              <Typography fontWeight="600">Tên việc làm</Typography>
            </Box>
            <Box flex="0.2">
              <Typography fontWeight="600" textAlign="center">
                Hồ sơ ứng tuyển
              </Typography>
            </Box>
            <Box flex="0.2" fontWeight="600">
              Ngày nộp
            </Box>
            <Box flex="0.2" fontWeight="600">
              Hạn Nộp
            </Box>
            <Box flex="0.2" fontWeight="600">
              Trạng thái
            </Box>
          </Box>
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
