import {
  KeyboardArrowDown,
  LocationCity,
  LogoutOutlined,
  NotificationsNoneOutlined,
  PersonOutlineOutlined,
} from '@mui/icons-material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import {
  Avatar,
  Badge,
  Box,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { BsFillChatDotsFill } from 'react-icons/bs';
import { BiLogInCircle } from 'react-icons/bi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from 'src/assets/images/logo.png';
import { socketIo } from 'src/clients/socket';
import { baseURL } from 'src/config';
import { MODAL_IDS } from 'src/constants';
import { CPathRouter } from 'src/constants/common';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import LoginForm from 'src/pages/auth/login_form';
import { resetApplyData } from 'src/redux_store/apply/apply_slice';
import { resetState } from 'src/redux_store/auth/authSlice';
import { openModal } from 'src/redux_store/common/modal/modal_slice';
import { logout, resetStateUser } from 'src/redux_store/user/user_slice';
import theme from 'src/theme';
import { checkRoleUser } from 'src/utils/common';
import Notification from '../notification';
import useStyles from './styles';

export const settings: {
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
    icon: <ChatBubbleOutlineOutlinedIcon />,
    title: 'Tin nhắn',
    path: '/users/message',
  },
  {
    icon: <LogoutOutlined />,
    title: 'Đăng xuất',
  },
];

const Header = () => {
  const location = useLocation();
  const {
    notification: { total_notification },
  } = useAppSelector((state) => state.userSlice);

  const { me, token } = useAppSelector((state) => state.authSlice);

  const [anchorNotifi, setAnchorNotifi] = useState<HTMLButtonElement | null>(
    null
  );

  const [openSideBar, setOpenSidebar] = useState<boolean>(false);

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

  const handleLogout = () => {
    dispatch(logout(''));
    dispatch(resetApplyData());
    dispatch(resetStateUser());
    dispatch(resetState());
    setAnchorElUser(null);
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpenSidebar(open);
    };
  const list = () => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={toggleDrawer(false)}>
          <CancelOutlinedIcon
            sx={{
              fontSize: '2rem',
            }}
          />
        </IconButton>
      </Box>
      <Divider />

      <List>
        {CPathRouter.map((item, index) => (
          <ListItem
            key={item.title}
            disablePadding
            onClick={() => navigate(`${item.path}`)}
          >
            <ListItemButton>
              <ListItemIcon>
                <ArrowRightOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                primary={item.title}
                sx={{
                  '& span': {
                    fontSize: '16px',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List
        sx={{
          [theme.breakpoints.up('sm')]: {
            display: 'none',
          },
        }}
      >
        {token ? (
          <>
            {settings.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                onClick={() => {
                  if (item.path) {
                    return navigate(`${item.path}`);
                  }
                  handleLogout();
                }}
              >
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{
                      '& span': {
                        fontSize: '16px',
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </>
        ) : (
          <>
            <ListItem disablePadding onClick={handleOpenClick}>
              <ListItemButton>
                <ListItemIcon>
                  <BiLogInCircle fontSize="1.8rem" />
                </ListItemIcon>
                <ListItemText
                  primary="Đăng nhập/ Đăng ký"
                  sx={{
                    '& span': {
                      fontSize: '16px',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => navigate('/company')}>
              <ListItemButton>
                <ListItemIcon>
                  <LocationCity />
                </ListItemIcon>
                <ListItemText
                  primary="Đăng ký nhà tuyển dụng"
                  sx={{
                    '& span': {
                      fontSize: '16px',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
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
              {CPathRouter.map((item) => (
                <li
                  className={classes.liItem}
                  key={item.path}
                  style={{
                    background:
                      item.path === location.pathname ? '#341678' : '',
                  }}
                >
                  <Link to={item.path}>
                    <Typography fontWeight="600" fontSize="16px">
                      {item.title}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            gap="30px"
            flex="1"
            alignItems="center"
          >
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
                        src={
                          `${baseURL}/${me.avatar}` ||
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
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.title}
                        onClick={handleCloseUserMenu}
                        onClickCapture={() => {
                          if (setting.path) {
                            navigate(setting.path);
                          } else {
                            handleLogout();
                          }
                        }}
                        sx={{
                          '& svg': {
                            mr: 1,
                          },
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
              <Box
                display="flex"
                sx={{
                  [theme.breakpoints.down('sm')]: {
                    display: 'none',
                  },
                }}
              >
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
                [theme.breakpoints.down('sm')]: {
                  display: 'none',
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
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={toggleDrawer(true)}
              sx={{
                [theme.breakpoints.up('md')]: {
                  display: 'none',
                },
              }}
            >
              <WidgetsOutlinedIcon
                sx={{
                  color: theme.palette.common.white,
                  fontSize: '2rem',
                }}
              />
            </IconButton>
            <Drawer
              anchor="right"
              open={openSideBar}
              onClose={toggleDrawer(false)}
            >
              {list()}
            </Drawer>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
