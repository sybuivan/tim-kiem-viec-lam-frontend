import { Container } from '@mui/material';
import React from 'react';
// import { dataJobs } from '../home';
import JobListFilters from './filters';
import JobListResults from './job_list_result';

const JobList = () => {
  return (
    <Container sx={{ maxWidth: '1500px!important' }}>
      <JobListFilters />

      {/* <JobListResults jobList={dataJobs} /> */}
    </Container>
  );
};

export default JobList;
