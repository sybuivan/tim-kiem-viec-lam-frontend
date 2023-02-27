import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
import Header from 'src/components/header';

const MainLayout = () => {
  return (
    <Box>
      <Box
        sx={{
          position: 'fixed',
          width: '100%',
          zIndex: 1000,
          maxWidth: '1349px',
        }}
      >
        <Header />
      </Box>
      <Box pt="70px">
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
