import { styled, Avatar } from '@mui/material';
import theme from 'src/theme';

export const AvatarWrapper = styled(Avatar)(
  () => `
      margin: ${theme.spacing(0, 0, 1, -0.5)};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: ${theme.spacing(1)};
      padding: ${theme.spacing(0.5)};
      border-radius: 60px;
      height: ${theme.spacing(5.5)};
      width: ${theme.spacing(5.5)};
      background: ${theme.palette.common.white};
    
      img {
        background: ${theme.palette.common.white};
        padding: ${theme.spacing(0.5)};
        display: block;
        border-radius: inherit;
        height: ${theme.spacing(4.5)};
        width: ${theme.spacing(4.5)};
      }
  `
);
