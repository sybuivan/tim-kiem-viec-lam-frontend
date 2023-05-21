import React from 'react';
import { Grid } from '@mui/material';

import { IJob } from 'src/types/job';
import JobItem from 'src/components/job_item';

const JobsSlider = ({ jobList }: { jobList: IJob[] }) => {
  return (
    <Grid container>
      {jobList.map((job) => (
        <Grid item lg={4} md={4} sm={6} xs={12}>
          <JobItem jobItem={job} key={job.id_job} m={1} />
        </Grid>
      ))}
    </Grid>
  );
};

export default JobsSlider;
