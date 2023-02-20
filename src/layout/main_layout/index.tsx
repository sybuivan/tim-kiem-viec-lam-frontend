import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router';
import Header from 'src/components/header';

const MainLayout = () => {
  return (
    <Box>
      <Header />
      <Outlet />
    </Box>
  );
};

export default MainLayout;
