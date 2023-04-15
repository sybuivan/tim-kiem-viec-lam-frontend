import { Box } from '@mui/material';
import React from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import { Outlet } from 'react-router';
import { HeaderCompany } from 'src/components/header';

const CompanyLayout = () => {
  return (
    <Box bgcolor="#f2f3f7">
      <Box
        sx={{
          position: 'fixed',
          width: '100%',
          zIndex: 1000,
        }}
      >
        <HeaderCompany />
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

export default CompanyLayout;
