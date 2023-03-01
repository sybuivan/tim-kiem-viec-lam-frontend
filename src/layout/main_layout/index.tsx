import { Box } from '@mui/material';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { Outlet } from 'react-router';
import Header from 'src/components/header';

const MainLayout = () => {
  return (
    <Box bgcolor="#f2f3f7">
      <Box
        sx={{
          position: 'fixed',
          width: '100%',
          zIndex: 1000,
          maxWidth: '1346px',
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
