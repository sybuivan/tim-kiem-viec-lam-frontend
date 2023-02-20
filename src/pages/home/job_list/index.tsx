import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import JobItem from 'src/components/job_item';
import { IJobList } from 'src/types/job';

const JobList = ({
  jobList,
  icon,
  title,
}: {
  jobList: IJobList;
  icon?: any;
  title?: string;
}) => {
  const { data } = jobList;
  return (
    <Box mb={5}>
      <Box display="flex" alignItems="center" gap={1} my={4}>
        {icon}
        <Typography fontSize="30px" fontWeight="800">
          {title}
        </Typography>
      </Box>
      <Grid container rowSpacing={2} columnSpacing={2}>
        {data.map((item, index) => (
          <JobItem jobItem={item} key={index} />
        ))}
      </Grid>
    </Box>
  );
};

export default JobList;
