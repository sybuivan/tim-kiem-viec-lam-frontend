import { styled, Box } from '@mui/material';

export const MenuWrapper = styled(Box)(
  ({ theme }) => `
   .MuiList-root {
     padding: ${theme.spacing(1)};
 
     & > .MuiList-root {
       padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
     }
   }
 
     .MuiListSubheader-root {
       text-transform: uppercase;
       font-weight: bold;
       font-size:14px;
       color: ${theme.palette.grey[500]};
       padding: ${theme.spacing(0, 2.5)};
       line-height: 1.4;
     }
 `
);

export const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
     .MuiList-root {
 
       .MuiListItem-root {
         padding: 1px 0;
 
         .MuiBadge-root {
           position: absolute;
           right: ${theme.spacing(3.2)};
 
           .MuiBadge-standard {
             background: ${theme.palette.primary.main};
             font-size: ${theme.typography.pxToRem(10)};
             font-weight: bold;
             text-transform: uppercase;
             color: ${theme.palette.primary.contrastText};
           }
         }
     
         .MuiButton-root {
           display: flex;
           color: ${theme.palette.common.white};
           background-color: transparent;
           width: 100%;
           justify-content: flex-start;
           padding: ${theme.spacing(1.2, 3)};
 
           .MuiButton-startIcon,
           .MuiButton-endIcon {
             transition: ${theme.palette.primary.main};
 
             .MuiSvgIcon-root {
               font-size: inherit;
               transition: none;
             }
           }
 
           .MuiButton-startIcon {
             color: ${theme.palette.common.white};
             font-size: ${theme.typography.pxToRem(20)};
             margin-right: ${theme.spacing(1)};
           }
           
           .MuiButton-endIcon {
             color: ${theme.palette.primary.main};
             margin-left: auto;
             opacity: .8;
             font-size: "14px"
           }
 
           &.active,
           &:hover {
             background-color: rgba(255, 255, 255, 0.06);
 
             .MuiButton-startIcon,
             .MuiButton-endIcon {
               color: ${theme.palette.common.white};
             }
           }
         }
 
         &.Mui-children {
           flex-direction: column;
 
           .MuiBadge-root {
             position: absolute;
             right: ${theme.spacing(7)};
           }
         }
 
         .MuiCollapse-root {
           width: 100%;
 
           .MuiList-root {
             padding: ${theme.spacing(1, 0)};
           }
 
           .MuiListItem-root {
             padding: 1px 0;
 
             .MuiButton-root {
               padding: ${theme.spacing(0.8, 3)};
 
               .MuiBadge-root {
                 right: ${theme.spacing(3.2)};
               }
 
               &:before {
                 content: ' ';
                 opacity: 0;
                
                 width: 6px;
                 height: 6px;
                 transform: scale(0);
                 transform-origin: center;
                 border-radius: 20px;
                 margin-right: ${theme.spacing(1.8)};
               }
 
               &.active,
               &:hover {
 
                 &:before {
                   transform: scale(1);
                   opacity: 1;
                 }
               }
             }
           }
         }
       }
     }
 `
);
