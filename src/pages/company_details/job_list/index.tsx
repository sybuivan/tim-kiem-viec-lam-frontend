import React from 'react';
import { Box, Typography, Container, IconButton, Paper } from '@mui/material';
import {
  LocationOnOutlined,
  FavoriteBorderOutlined,
  AttachMoneyOutlined,
  HourglassBottomOutlined,
} from '@mui/icons-material';
import theme from 'src/theme';

const JobItem = () => {
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
          <FavoriteBorderOutlined />
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

const JobList = () => {
  return (
    <Paper
      sx={{
        p: 1,
        mt: '40px',
      }}
    >
      <Container
        sx={{
          maxWidth: '1000px!important',
        }}
      >
        <Box my={2}>
          <Typography fontWeight="600" fontSize="24px" mb={2}>
            Vị trí đang tuyển
          </Typography>

          <Box>
            <JobItem />
            <JobItem />
            <JobItem />
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};

export default JobList;
