import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import JobItem from 'src/components/job_item';
import SkeletonJob from 'src/components/skeleton/job';
import { useGetStatus } from 'src/hooks';
import { IJob } from 'src/types/job';

const JobList = ({
  jobList,
  icon,
  title,
}: {
  jobList: IJob[];
  icon?: any;
  title?: string;
}) => {
  const [isLoading] = useGetStatus('job', 'getJobList');

  if (isLoading)
    return (
      <>
        <Grid container rowSpacing={2} columnSpacing={2}>
          {Array.from(Array(20).keys()).map((item) => (
            <SkeletonJob type="home" />
          ))}
        </Grid>
      </>
    );
  return (
    <Box mb={5}>
      <Box display="flex" alignItems="center" gap={1} my={4}>
        {icon}
        <Typography fontSize="30px" fontWeight="800">
          {title}
        </Typography>
      </Box>
      <Grid container rowSpacing={2} columnSpacing={2}>
        {jobList.map((item, index) => (
          <JobItem jobItem={item} key={item.id_job} />
        ))}
      </Grid>
    </Box>
  );
};

export default JobList;
