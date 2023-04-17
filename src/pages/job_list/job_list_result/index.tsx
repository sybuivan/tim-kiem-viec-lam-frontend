import { Box, Typography, Grid } from '@mui/material';

import React from 'react';
import { useNavigate } from 'react-router';
import JobItem from 'src/components/job_item';
import PaginationComponent from 'src/components/pagination';
import SkeletonJob from 'src/components/skeleton/job';
import { useAppDispatch, useAppSelector, useGetStatus } from 'src/hooks';
import { getJobListFilters } from 'src/redux_store/job/job_action';
import { changeHomeFilter } from 'src/redux_store/job/job_slices';
import { IJob, IJobList } from 'src/types/job';

const JobListResults = ({ jobList }: { jobList: IJob[] }) => {
  const {
    jobFilters,
    jobList: { total },
  } = useAppSelector((state) => state.jobSlice);

  const [isLoading] = useGetStatus('job', 'getJobListFilters');
  const dispatch = useAppDispatch();

  const handleOnChangePage = (newPage: number) => {
    const newFilters = {
      ...jobFilters,
      page: newPage,
    };
    dispatch(getJobListFilters(newFilters));
    dispatch(changeHomeFilter(newFilters));
  };

  if (isLoading)
    return (
      <Box mt={8}>
        <Grid container rowSpacing={2} columnSpacing={2}>
          {Array.from(Array(20).keys()).map((item) => (
            <SkeletonJob type="list" xs={6} />
          ))}
        </Grid>
      </Box>
    );
  return (
    <Box mt={8}>
      <Box mb={2}>
        <Typography fontSize="24px">
          Kết quả tìm kiếm ({total} tin đăng)
        </Typography>
      </Box>

      <Box mb={2}>
        <Grid container rowSpacing={1} columnSpacing={1}>
          {jobList.map((item) => (
            <JobItem jobItem={item} key={item.id_job} col={6} isPage />
          ))}
        </Grid>
      </Box>

      <Box display="flex" justifyContent="center" py={2}>
        <PaginationComponent
          page={Number(jobFilters.page)}
          count={Math.ceil(total / 20)}
          handleOnChange={handleOnChangePage}
        />
      </Box>
    </Box>
  );
};

export default JobListResults;
