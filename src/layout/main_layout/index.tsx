import { Box } from '@mui/material';
import React, { useEffect, useCallback } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { Outlet, useLocation } from 'react-router';
import Header from 'src/components/header';

const MainLayout = () => {
  const location = useLocation();

  const handleOnScroll = useCallback(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <Box bgcolor="#f2f3f7">
      <Box
        sx={{
          position: 'fixed',
          width: '100%',
          zIndex: 1000,
        }}
      >
        <Header />
      </Box>
      <Box
        pt="70px"
        height="100vh"
        sx={{
          overflowX: 'hidden',
        }}
      >
        <Scrollbars>
          <Outlet />
        </Scrollbars>
      </Box>
    </Box>
  );
};

export default MainLayout;
