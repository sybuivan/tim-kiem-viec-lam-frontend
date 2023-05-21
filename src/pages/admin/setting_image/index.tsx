import React from 'react';
import { Box, Paper, Grid, Typography } from '@mui/material';
import logo from 'src/assets/images/logo.png';
import Banne2 from 'src/assets/images/banner2.png';

const SettingImage = () => {
  return (
    <Box>
      <Grid container columnSpacing={2}>
        <Grid item xs={3}>
          <Paper
            elevation={3}
            variant="outlined"
            sx={{
              p: 2,
            }}
          >
            <Typography
              fontSize="18px"
              fontWeight="600"
              sx={{
                mb: 1,
              }}
            >
              Logo
            </Typography>
            <img src={logo} alt="" width="100%" />
          </Paper>
        </Grid>
        <Grid item xs={9}>
          <Paper
            elevation={3}
            variant="outlined"
            sx={{
              p: 2,
            }}
          >
            <Typography
              fontSize="18px"
              fontWeight="600"
              sx={{
                mb: 1,
              }}
            >
              Banner
            </Typography>
            <div
              style={{
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                height: '180px',
                position: 'relative',
                backgroundImage: `url(${Banne2})`,
              }}
            ></div>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingImage;
