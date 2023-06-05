import { KeyboardArrowDown } from '@mui/icons-material';
import { LocationCity, NotificationsNoneOutlined } from '@mui/icons-material';
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
import { BsFillChatDotsFill } from 'react-icons/bs';
import React from 'react';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { PersonOutlineOutlined, LogoutOutlined } from '@mui/icons-material';
import logo from 'src/assets/images/logo.png';
import { MODAL_IDS } from 'src/constants';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import LoginForm from 'src/pages/auth/login_form';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import theme from 'src/theme';
import useStyles from './styles';
import { logout, resetStateUser } from 'src/redux_store/user/user_slice';
import { logoutCompany } from 'src/redux_store/company/company_slices';
import { resetState } from 'src/redux_store/auth/authSlice';
import { resetApplyData } from 'src/redux_store/apply/apply_slice';
import { checkRoleCompany, checkRoleUser } from 'src/utils/common';
import { socketIo } from 'src/clients/socket';
import Notification from '../notification';

const settings: {
  icon: any;
  title: string;
  path?: string;
}[] = [
  {
    icon: <PersonOutlineOutlined />,
    title: 'Tài khoản người dùng',
    path: '/thong-tin-ca-nhan',
  },
  {
    icon: <LogoutOutlined />,
    title: 'Đăng xuất',
  },
];
const settingsCompany: {
  icon: any;
  title: string;
}[] = [
  {
    icon: <LogoutOutlined />,
    title: 'Đăng xuất',
  },
];

const Header = () => {
  const {
    notification: { total_notification },
  } = useAppSelector((state) => state.userSlice);

  const { me, token } = useAppSelector((state) => state.authSlice);

  const [anchorNotifi, setAnchorNotifi] =
    React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorNotifi(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorNotifi(null);
  };

  const open = Boolean(anchorNotifi);
  const id = open ? 'simple-popover' : undefined;
  const dispatch = useAppDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();
  const classes = useStyles();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenClick = () => {
    dispatch(
      openModal({
        modalId: MODAL_IDS.login,
        dialogComponent: <LoginForm socket={socketIo} />,
      })
    );
  };

  return (
    <Box bgcolor={theme.palette.primary.main} height={70} width="100%">
      <Container
        sx={{
          height: '100%',
          [theme.breakpoints.up('lg')]: { minWidth: '1300px' },
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
          <Box
            sx={{
              [theme.breakpoints.down('md')]: {
                display: 'none',
              },
            }}
          >
            <ul
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: '10px',
              }}
            >
              <li className={classes.liItem}>
                <Link to="/co-hoi-viec-lam">
                  <Typography fontWeight="600" fontSize="16px">
                    Cơ hội việc làm
                  </Typography>
                </Link>
              </li>
              <li className={classes.liItem}>
                <Link
                  to=""
                  style={{
                    fontWeight: 600,
                    fontSize: '15px',
                  }}
                >
                  <Typography fontWeight="600" fontSize="16px">
                    Tin tức
                  </Typography>
                </Link>
              </li>
            </ul>
          </Box>
          <Box display="flex" justifyContent="flex-end" gap="30px" flex="1">
            {checkRoleUser(me?.id_role, token) ? (
              <>
                <Box
                  sx={{
                    [theme.breakpoints.down('md')]: {
                      display: 'none',
                    },
                    cursor: 'pointer',
                    '& p': {
                      fontWeight: 600,
                    },
                  }}
                  display="flex"
                  color={theme.palette.common.white}
                  alignItems="center"
                  gap={1}
                >
                  <Box>
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
                  </Box>

                  <Notification
                    open={open}
                    id={id}
                    handleClose={handleClose}
                    anchorEl={anchorNotifi}
                  />

                  <Box
                    onClick={() => navigate('/users/message')}
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
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Quản lý hồ sơ">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0, color: theme.palette.common.white }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={me?.avatar || '/static/images/avatar/2.jpg'}
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
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.title}
                        onClick={handleCloseUserMenu}
                        onClickCapture={() => {
                          if (setting.path) {
                            navigate(setting.path);
                          } else {
                            dispatch(logout(''));
                            dispatch(resetApplyData());
                            dispatch(resetStateUser());
                            dispatch(resetState());
                            setAnchorElUser(null);
                            // navigate('/');
                          }
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
              </>
            ) : (
              <Box display="flex">
                <Box
                  display="flex"
                  alignItems="center"
                  className={classes.liItem}
                  onClick={handleOpenClick}
                >
                  <Typography
                    fontWeight="600"
                    fontSize="16px"
                    color={theme.palette.common.white}
                  >
                    Đăng nhập/
                  </Typography>
                  <Typography
                    fontWeight="600"
                    fontSize="16px"
                    color={theme.palette.common.white}
                  >
                    Đăng ký
                  </Typography>
                </Box>
              </Box>
            )}
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
              onClick={() => navigate('/company')}
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
                      src={me?.logo || '/static/images/avatar/2.jpg'}
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

export default Header;
