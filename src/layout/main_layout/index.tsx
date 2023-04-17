import { Box } from '@mui/material';
import React, { useEffect, useCallback, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { Outlet, useLocation } from 'react-router';
import Header from 'src/components/header';

const MainLayout = () => {
  const location = useLocation();
  const refScroll = useRef<any>();

  useEffect(() => {
    refScroll.current?.scrollToTop({ behavior: 'smooth', block: 'start' });
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
        <Scrollbars ref={refScroll}>
          <Outlet />
        </Scrollbars>
      </Box>
    </Box>
  );
};

export default MainLayout;
