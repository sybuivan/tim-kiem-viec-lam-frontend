import { Box, Typography, Grid } from '@mui/material';

import React from 'react';
import JobItem from 'src/components/job_item';
import PaginationComponent from 'src/components/pagination';
import { IJobList } from 'src/types/job';

const JobListResults = ({ jobList }: { jobList: IJobList }) => {
  const { data } = jobList;

  const handleOnChangePage = (newPage: number) => {
    console.log({
      newPage,
    });
  };
  return (
    <Box mt={8}>
      <Box mb={2}>
        <Typography fontSize="24px">
          Kết quả tìm kiếm (14,560 tin đăng)
        </Typography>
      </Box>

      <Box mb={2}>
        <Grid container rowSpacing={2} columnSpacing={2}>
          {data.map((item, index) => (
            <JobItem jobItem={item} key={index} col={6} isPage />
          ))}
        </Grid>
      </Box>

      <Box display="flex" justifyContent="center" py={2}>
        <PaginationComponent
          page={1}
          count={10}
          handleOnChange={handleOnChangePage}
        />
      </Box>
    </Box>
  );
};

export default JobListResults;
