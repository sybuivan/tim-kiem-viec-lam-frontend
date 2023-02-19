import { Box } from '@mui/material';
import React from 'react';
import Header from 'src/components/header';
import Slider from 'src/components/silder';

const MainLayout = () => {
  return (
    <Box>
      <Header />
      <Slider />
    </Box>
  );
};

export default MainLayout;
