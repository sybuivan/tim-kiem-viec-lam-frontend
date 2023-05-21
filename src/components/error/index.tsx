import React from 'react';
import { Box, Typography } from '@mui/material';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import theme from 'src/theme';
const Error = ({ title }: { title: string }) => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: `1px solid ${theme.palette.error.main}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        background: '#fef6f7',
      }}
    >
      <ErrorOutlineOutlinedIcon
        sx={{
          color: theme.palette.error.main,
        }}
      />
      <Typography
        color={theme.palette.error.main}
        textAlign="center"
        fontWeight="600"
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Error;
