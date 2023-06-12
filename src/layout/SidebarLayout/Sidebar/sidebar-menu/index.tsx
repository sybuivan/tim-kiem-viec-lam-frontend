import { DashboardOutlined } from '@mui/icons-material';
import { Button, List, ListItem, ListSubheader } from '@mui/material';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { CPathSideBar } from '../../path';
import { MenuWrapper, SubMenuWrapper } from './styles';

function SidebarMenu() {
  const location = useLocation();
  return (
    <>
      <MenuWrapper>
        <List component="div">
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  sx={{
                    '.MuiListItem-root > a': {
                      backgroundColor:
                        location.pathname === '/admin/dashboard'
                          ? 'rgba(255, 255, 255, 0.06)'
                          : 'none',
                    },
                  }}
                  disableRipple
                  component={RouterLink}
                  to="/admin/dashboard"
                  startIcon={<DashboardOutlined />}
                >
                  Dashboard
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        {CPathSideBar.map((path) => (
          <List key={path.subheader}>
            <SubMenuWrapper>
              <List
                component="div"
                subheader={
                  <ListSubheader component="div" disableSticky>
                    {path.subheader}
                  </ListSubheader>
                }
              >
                {path.children.map((item) => (
                  <ListItem component="div" key={item.label}>
                    <Button
                      disableRipple
                      component={RouterLink}
                      to={item.to}
                      startIcon={item.icon}
                      sx={{
                        '.MuiListItem-root > a': {
                          backgroundColor:
                            location.pathname === item.to
                              ? 'rgba(255, 255, 255, 0.06)'
                              : 'none',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  </ListItem>
                ))}
              </List>
            </SubMenuWrapper>
          </List>
        ))}
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
