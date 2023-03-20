import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import ProfileBar from '../../components/profile_bar';
import { Outlet } from 'react-router';
import { makeStyles } from '@mui/styles';
import { CProfileRoute } from 'src/constants/profile';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
  },
});

const Profile = () => {
  const classes = useStyles();
  return (
    <Box>
      <Container
        sx={{
          height: '100%',
          minWidth: '1600px',
          paddingLeft: '0!important',
          overflowX: 'hidden',
          minHeight: '30px',
        }}
      >
        <Grid container columnSpacing={2}>
          <Grid item xs={2.5}>
            <Box className={classes.root}>
              <ProfileBar data={CProfileRoute.data} />
            </Box>
          </Grid>
          <Grid item xs={7.5}>
            <Box minHeight="90vh">
              <Outlet />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Profile;
