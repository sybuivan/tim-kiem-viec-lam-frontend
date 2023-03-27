import React from 'react';
import { Grid } from '@mui/material';
import WatchList from './watch-list';

const Dashboard = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing={4}
    >
      <Grid item xs={12}>
        <WatchList />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
