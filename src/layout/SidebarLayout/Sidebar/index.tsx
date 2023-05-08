import Scrollbars from 'react-custom-scrollbars-2';
import { Box, Drawer, styled, Divider, useTheme } from '@mui/material';
import logo from 'src/assets/images/logo.png';

import SidebarMenu from './sidebar-menu';
import { useNavigate } from 'react-router';
import theme from 'src/theme';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px;
`
);

function Sidebar() {
  const navigate = useNavigate();
  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block',
          },
          position: 'fixed',
          left: 0,
          top: 0,
          width: '300px',
          background: theme.palette.primary.main,
        }}
      >
        <Scrollbars>
          <Box mt={3}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                margin: 'auto',
              }}
            >
              <img
                onClick={() => navigate('/')}
                src={logo}
                alt="logo"
                height="60"
                style={{
                  margin: 'auto',
                }}
              />
            </Box>
          </Box>
          <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.palette.common.white,
            }}
          />
          <SidebarMenu />
        </Scrollbars>
        <Divider />
      </SidebarWrapper>
      <Drawer
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper>
          <Scrollbars>
            <Box mt={3}>
              <Box
                mx={2}
                sx={{
                  width: 52,
                }}
              >
                <img src={logo} alt="logo" width="200" height="60" />
              </Box>
            </Box>
            <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
              }}
            />
            <SidebarMenu />
          </Scrollbars>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
