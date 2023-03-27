import { useContext } from 'react';

import {
  Box,
  alpha,
  Stack,
  lighten,
  Divider,
  IconButton,
  Tooltip,
  styled,
  useTheme,
  Typography,
} from '@mui/material';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import HeaderButtons from './Buttons';
import HeaderUserbox from './Userbox';

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 6;
        backdrop-filter: blur(3px);
        position: fixed;
        justify-content: space-between;
        width: calc(100% - 300px);
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`
);

function Header() {
  const sidebarToggle = true;
  return (
    <HeaderWrapper
      sx={{
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography fontSize="18px" fontWeight="600" textAlign="center">
            Quản lý hệ thống ứng tuyển và tìm kiếm việc làm
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <HeaderButtons />
          <HeaderUserbox />
          <Box
            component="span"
            sx={{
              ml: 2,
              display: { lg: 'none', xs: 'inline-block' },
            }}
          >
            <Tooltip arrow title="Toggle Menu">
              <IconButton color="primary">
                {!sidebarToggle ? (
                  <MenuTwoToneIcon fontSize="small" />
                ) : (
                  <CloseTwoToneIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </HeaderWrapper>
  );
}

export default Header;
