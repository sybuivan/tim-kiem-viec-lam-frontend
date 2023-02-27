import {
  AttachMoneyOutlined,
  FavoriteBorderOutlined,
  HourglassBottomOutlined,
  LocationOnOutlined,
  FavoriteOutlined,
} from '@mui/icons-material';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import theme from 'src/theme';

export const JobCompany = ({ isSave }: { isSave?: boolean }) => {
  return (
    <Box
      px={2}
      py={2}
      border="1px solid #c1c1c1"
      borderRadius="4px"
      sx={{
        '&:hover': {
          border: `1px solid ${theme.palette.primary.dark}`,
          cursor: 'pointer',
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontWeight="600" fontSize="16px">
          Nhân Viên Content Marketing
        </Typography>
        <IconButton>
          {isSave ? (
            <FavoriteOutlined
              sx={{
                color: theme.palette.primary.main,
              }}
            />
          ) : (
            <FavoriteBorderOutlined />
          )}
        </IconButton>
      </Box>
      <Box display="flex" gap={4}>
        <Box display="flex" gap={0.5}>
          <LocationOnOutlined
            sx={{
              color: theme.palette.grey[600],
            }}
          />
          <Typography
            sx={{
              color: theme.palette.grey[600],
            }}
          >
            Nơi làm việc:
          </Typography>
          <Typography>Hà nội </Typography>
        </Box>
        <Box display="flex" gap={0.5}>
          <AttachMoneyOutlined
            sx={{
              color: theme.palette.grey[600],
            }}
          />
          <Typography
            sx={{
              color: theme.palette.grey[600],
            }}
          >
            Lương:
          </Typography>
          <Typography>11 - 30 triệu </Typography>
        </Box>
        <Box display="flex" gap={0.5}>
          <HourglassBottomOutlined
            sx={{
              color: theme.palette.grey[600],
            }}
          />
          <Typography
            sx={{
              color: theme.palette.grey[600],
            }}
          >
            Hạn nộp:
          </Typography>
          <Typography>12/03/2023 </Typography>
        </Box>
      </Box>
    </Box>
  );
};
