import React from 'react';
import { Grid } from '@mui/material';

import { IJob } from 'src/types/job';
import JobItem from 'src/components/job_item';

const JobsSlider = ({ jobList }: { jobList: IJob[] }) => {
  return (
    <Grid container>
      {jobList.map((job) => (
        <JobItem jobItem={job} key={job.id_job} m={1} />
      ))}
    </Grid>
  );
};

export default JobsSlider;
