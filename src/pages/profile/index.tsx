import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import ProfileBar from '../../components/profile_bar';
import { Outlet } from 'react-router';
import { makeStyles } from '@mui/styles';
import { CProfileRoute } from 'src/constants/profile';
import theme from 'src/theme';

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
          paddingLeft: '0!important',
          overflowX: 'hidden',
          minHeight: '30px',
          minWidth: {
            lg: '1300px',
          },
        }}
      >
        <Grid container columnSpacing={2} justifyContent="space-between">
          <Grid
            item
            lg={2.5}
            md={3}
            sm={12}
            xs={12}
            bgcolor={theme.palette.common.white}
          >
            <Box>
              <ProfileBar data={CProfileRoute.data} />
            </Box>
          </Grid>
          <Grid item lg={9.5} md={9} sm={12} xs={12}>
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
