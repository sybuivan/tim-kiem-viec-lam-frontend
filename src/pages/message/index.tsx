import { Grid, Paper } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
import { SideBar } from './side_bar';

const Message = () => {
  return (
    <Paper
      sx={{
        width: '100%',
        height: 'calc(100vh - 70px)',
        border: '1px solid #c1c1c1',
      }}
    >
      <Grid
        container
        sx={{
          height: '100%',
          minWidth: '1600px',
          paddingLeft: '0!important',
          overflowY: 'hidden',
          minHeight: '30px',
        }}
      >
        <Grid item xs={3}>
          <SideBar />
        </Grid>
        <Grid item xs={8}>
          <Outlet />
        </Grid>
      </Grid>
    </Paper>
  );
};

Message.propTypes = {};

export default Message;
