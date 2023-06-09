import React from 'react';

import { Box, Grid } from '@mui/material';
import HeadTitle from 'src/components/head_title';
import JobItem from 'src/components/job_item';
import SkeletonJob from 'src/components/skeleton/job';
import { useGetStatus } from 'src/hooks';
import { IJob } from 'src/types/job';

const JobNews = ({
  jobList,
  icon,
  title,
}: {
  jobList: IJob[];
  icon: any;
  title: string;
}) => {
  const [isLoading] = useGetStatus('user', 'getSuggetJobForYou');

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
      <HeadTitle title={title} icon={icon} />

      <Grid container rowSpacing={2} columnSpacing={2}>
        {jobList.map((item) => (
          <JobItem jobItem={item} key={item.id_job} />
        ))}
      </Grid>
    </Box>
  );
};

export default JobNews;
