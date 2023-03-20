import { Box } from '@mui/material';
import React from 'react';
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
          maxWidth: '1346px',
        }}
      >
        <HeaderCompany />
      </Box>
      <Box pt="70px">
        <Outlet />
      </Box>
    </Box>
  );
};

export default CompanyLayout;
