import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  Container,
  Badge,
} from '@mui/material';

import React from 'react';
import { Link } from 'react-router-dom';
import {
  NotificationsNoneOutlined,
  LocationCity,
  KeyboardArrowDown,
} from '@mui/icons-material';

import theme from 'src/theme';
import { ReactComponent as ReactLogo } from 'src/assets/images/logo.svg';
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box bgcolor={theme.palette.primary.main} height={70} width="100%">
      <Container
        sx={{
          height: '100%',
          minWidth: '1300px',
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          height="100%"
          sx={{
            '& a': {
              color: theme.palette.common.white,
              fontWeight: 600,
            },
          }}
        >
          <Box mr={5}>
            <Link to="/">
              <ReactLogo width="200" height="60" />
            </Link>
          </Box>
          <Box>
            <ul
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
              }}
            >
              <li>
                <Link to="">Cơ hội việc làm</Link>
              </li>
              <li>
                <Link to="">Tin tức</Link>
              </li>
            </ul>
          </Box>

          <Box display="flex" justifyContent="flex-end" gap="80px" flex="1">
            <Box
              display="flex"
              color={theme.palette.common.white}
              alignItems="center"
              gap={2}
              sx={{
                cursor: 'pointer',
                '& p': {
                  fontWeight: 600,
                },
              }}
            >
              <Badge badgeContent={4} color="primary">
                <NotificationsNoneOutlined
                  color="action"
                  sx={{
                    color: theme.palette.common.white,
                  }}
                />
              </Badge>
              <Typography>Thông báo</Typography>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, color: theme.palette.common.white }}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  <Typography ml={1} fontWeight="600">
                    Van Sy
                  </Typography>
                  <KeyboardArrowDown />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box
              display="Flex"
              alignItems="center"
              gap={2}
              sx={{
                cursor: 'pointer',
                '& p': {
                  fontWeight: 600,
                },
              }}
              color={theme.palette.common.white}
            >
              <LocationCity />
              <Box>
                <Typography>Nhà tuyển dụng</Typography>
                <Typography>Đăng ký</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
