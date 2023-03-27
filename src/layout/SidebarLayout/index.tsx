import { Box, useTheme } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

interface SidebarLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: '100%',
          width: 'calc(100% - 300px)',

          '.MuiPageTitle-wrapper': {
            background: theme.palette.primary.main,
            marginBottom: `${theme.spacing(4)}`,
            boxShadow: `0px 2px 4px -3px ${theme.palette.common.black}`,
          },
        }}
      >
        <Header />
        <Sidebar />
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            right: '-300px',
            pt: `${theme.spacing(2)}`,
            [theme.breakpoints.up('lg')]: {
              ml: `${theme.spacing(2)}`,
            },
            top: '60px',
          }}
        >
          <Box display="block">
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SidebarLayout;
