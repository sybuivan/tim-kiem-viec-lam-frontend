import { Box, Avatar, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router';
import theme from 'src/theme';

export const MessageCard = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        padding: '8px',
        marginTop: '4px',
        userSelect: 'none',
        '&:hover': {
          background: theme.palette.grey[200],
          transition: 'all 0.4s',
        },
      }}
      onClick={() => navigate('/company/message/123')}
    >
      <Avatar
        alt="Remy Sharp"
        src={`http://localhost:5000/v1/}`}
        sx={{ width: '50px', height: '50px', mr: 2 }}
      />
      <Box>
        <Typography sx={{ fontWeight: '600', pb: 1 }}>Bùi Văn Sỷ</Typography>
        <Typography sx={{ display: 'flex' }}>
          Hello em
          <Typography sx={{ color: theme.palette.grey[600], p: '0 1rem' }}>
            -
          </Typography>
          <Typography
            sx={{ color: theme.palette.primary.main }}
            fontWeight="600"
          >
            1 giờ
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};
