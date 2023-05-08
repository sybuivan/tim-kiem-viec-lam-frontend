import React from 'react';
import { Box, LinearProgress } from '@mui/material';

const LoadingLinear = () => {
  return (
    <Box sx={{ position: 'fixed', top: 0, right: 0, left: 0, zIndex: 10000 }}>
      <LinearProgress color="inherit" />
    </Box>
  );
};

export default LoadingLinear;
