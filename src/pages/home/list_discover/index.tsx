import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Discover from './discover';
import { IDiscover } from 'src/types/common';
import { BsFillBriefcaseFill } from 'react-icons/bs';
import { IJobTop } from 'src/types/job';

interface IListDiscover {
  icon: any;
  title: string;
  list: IJobTop[];
}

const ListDiscover = ({ list, icon, title }: IListDiscover) => {
  return (
    <Box mb={5}>
      <Box display="flex" alignItems="center" gap={1} my={4}>
        <BsFillBriefcaseFill />
        <Typography fontSize="30px" fontWeight="800">
          {title}
        </Typography>
      </Box>
      <Grid container rowSpacing={1} columnSpacing={1}>
        {list.map((item, index) => (
          <Discover item={item} key={item.id_rank} />
        ))}
      </Grid>
    </Box>
  );
};

export default ListDiscover;
