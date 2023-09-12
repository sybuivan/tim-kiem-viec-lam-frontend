import { LogoutOutlined } from '@mui/icons-material';
import {
  KeyboardArrowDown,
  NotificationsNoneOutlined,
} from '@mui/icons-material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import {
  Avatar,
  Badge,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import logo from 'src/assets/images/logo.png';
import { baseURL } from 'src/config';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { resetState } from 'src/redux_store/auth/authSlice';
import { logoutCompany } from 'src/redux_store/company/company_slices';
import theme from 'src/theme';
import { checkRoleCompany } from 'src/utils/common';
import Notification from '../notification';
import useStyles from './styles';

export const settingsCompany: {
  icon: any;
  title: string;
}[] = [
  {
    icon: <LogoutOutlined />,
    title: 'Đăng xuất',
  },
];

export const HeaderCompany = () => {
  const { me, token } = useAppSelector((state) => state.authSlice);
  const [anchorNotifi, setAnchorNotifi] =
    React.useState<HTMLButtonElement | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const open = Boolean(anchorNotifi);
  const id = open ? 'simple-popover' : undefined;
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorNotifi(event.currentTarget);
  };
  const {
    notification: { total_notification },
  } = useAppSelector((state) => state.userSlice);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClose = () => {
    setAnchorNotifi(null);
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
              <img src={logo} alt="logo" width="100" height="60" />
            </Link>
          </Box>

          <Box display="flex" justifyContent="flex-end" gap="20px" flex="1">
            {checkRoleCompany(me?.id_role, token) && (
              <>
                <Box
                  display="flex"
                  color={theme.palette.common.white}
                  alignItems="center"
                  gap={1}
                  sx={{
                    cursor: 'pointer',
                    '& p': {
                      fontWeight: 600,
                    },
                  }}
                >
                  <IconButton aria-describedby={id} onClick={handleClick}>
                    <Badge badgeContent={total_notification} color="error">
                      <NotificationsNoneOutlined
                        color="action"
                        sx={{
                          color: theme.palette.common.white,
                        }}
                      />
                    </Badge>
                  </IconButton>
                  <Notification
                    open={open}
                    id={id}
                    handleClose={handleClose}
                    anchorEl={anchorNotifi}
                  />
                </Box>
                <Box
                  onClick={() => navigate('/company/message')}
                  display="flex"
                  color={theme.palette.common.white}
                  alignItems="center"
                  gap={1}
                  sx={{
                    cursor: 'pointer',
                    '& p': {
                      fontWeight: 600,
                    },
                  }}
                >
                  <Badge color="error">
                    <BsFillChatDotsFill
                      style={{
                        fontSize: '25px',
                      }}
                    />
                  </Badge>
                </Box>
              </>
            )}

            {checkRoleCompany(me?.id_role, token) ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Quản lý tài khoản">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, color: theme.palette.common.white }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        `${baseURL}/${me?.logo}` ||
                        '/static/images/avatar/2.jpg'
                      }
                    />
                    <Typography ml={1} fontWeight="600">
                      {me?.fullName}
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
                  {settingsCompany.map((setting) => (
                    <MenuItem
                      key={setting.title}
                      onClick={handleCloseUserMenu}
                      onClickCapture={() => {
                        dispatch(logoutCompany(''));
                        setAnchorElUser(null);
                        dispatch(resetState());
                      }}
                    >
                      {setting.icon}
                      <Typography textAlign="center">
                        {setting.title}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Box display="flex">
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  className={classes.liItem}
                  sx={{
                    borderRight: '1px solid #fff',
                  }}
                >
                  <Typography
                    fontWeight="600"
                    fontSize="16px"
                    color={theme.palette.common.white}
                  >
                    Đăng nhập
                  </Typography>
                  <AccountCircleOutlinedIcon
                    sx={{
                      color: theme.palette.common.white,
                    }}
                  />
                </Box>

                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{
                    cursor: 'pointer',
                    pl: 1,
                  }}
                  onClick={() => navigate('/')}
                >
                  <Groups2OutlinedIcon
                    sx={{
                      color: theme.palette.primary.contrastText,
                    }}
                  />
                  <Typography
                    fontWeight="600"
                    fontSize="16px"
                    color={theme.palette.common.white}
                  >
                    Người tìm việc
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeaderCompany;
