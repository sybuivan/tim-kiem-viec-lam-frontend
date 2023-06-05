import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
// import { dataJobs } from '../home';
import JobListFilters from './filters';
import queryString from 'query-string';
import JobListResults from './job_list_result';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { getJobList, getJobListFilters } from 'src/redux_store/job/job_action';
import { resetFilter } from 'src/redux_store/job/job_slices';
import { useLocation } from 'react-router';

const JobList = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isOpenFilters, setIsOpenFilters] = useState<boolean>(true);
  const {
    jobList: { data },
    jobFilters,
  } = useAppSelector((state) => state.jobSlice);
  useEffect(() => {
    dispatch(getJobListFilters(queryString.parse(location.search)));

    return () => {
      dispatch(resetFilter());
    };
  }, []);

  return (
    <Container sx={{ maxWidth: '1500px!important' }}>
      <JobListFilters
        isOpenFilters={isOpenFilters}
        onOpenFilters={() => setIsOpenFilters((pre) => !pre)}
      />

      <JobListResults jobList={data} />
    </Container>
  );
};

export default JobList;
