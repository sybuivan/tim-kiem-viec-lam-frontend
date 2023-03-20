import { Box, Typography, Paper } from '@mui/material';
import React from 'react';
import { ICustomAccordion } from 'src/types/profile';
import theme from 'src/theme';
import { useLocation, useNavigate } from 'react-router';

const CustomAccordion = ({ data }: { data: ICustomAccordion }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { accordionDetails, accordionSummary, icon } = data;

  const handleClick = (path: string) => {
    navigate(path);
  };
  return (
    <Box
      sx={{
        paddingBottom: '6px',
        paddingLeft: 7.25,
        '& .MuiButtonBase-root': {
          minHeight: '40px!important',
        },
        '& .MuiAccordionSummary-content': {
          margin: '4px 0!important',
        },
        '& svg': {
          color: theme.palette.primary.main,
        },
      }}
    >
      <Box
        sx={{
          margin: '2px 0',
        }}
        display="flex"
        alignItems="center"
        gap={0.5}
      >
        {icon}
        <Typography fontWeight="600">{accordionSummary}</Typography>
      </Box>
      {accordionDetails.map((item) => (
        <Box
          onClick={() => handleClick(item.path)}
          bgcolor={
            location.pathname === item.path || location.pathname === item.nested
              ? theme.palette.primary.contrastText
              : theme.palette.common.white
          }
          sx={{
            padding: '4px',
            '&:hover': {
              cursor: 'pointer',
              backgroundColor: theme.palette.primary.contrastText,
            },
          }}
        >
          <Box display="flex" alignItems="center" gap={1} pl={2}>
            {item.icon}
            <Typography>{item.name}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const ProfileBar = ({ data }: { data: ICustomAccordion[] }) => {
  return (
    <Paper
      sx={{
        height: '100vh',
      }}
    >
      <Box
        sx={{
          paddingTop: '10px',
          '& .Mui-expanded': {
            margin: '0!important',
          },
        }}
      >
        {data.map((item) => (
          <CustomAccordion data={item} />
        ))}
      </Box>
    </Paper>
  );
};

export default ProfileBar;
