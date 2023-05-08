import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import JobItem from 'src/components/job_item';
import { IJob } from 'src/types/job';
import Discover from './discover';
import { IDiscover } from 'src/types/common';

interface IListDiscover {
  icon: any;
  title: string;
  list: IDiscover[];
}
const CListDiscover = [];

const ListDiscover = ({ list, icon, title }: IListDiscover) => {
  return (
    <Box mb={5}>
      <Box display="flex" alignItems="center" gap={1} my={4}>
        {icon}
        <Typography fontSize="30px" fontWeight="800">
          {title}
        </Typography>
      </Box>
      <Grid container rowSpacing={1} columnSpacing={1}>
        {list.map((item, index) => (
          <Discover item={item} />
        ))}
      </Grid>
    </Box>
  );
};

export default ListDiscover;
