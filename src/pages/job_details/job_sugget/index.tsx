import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import {
  LocationOnOutlined,
  AttachMoneyOutlined,
  BusinessCenterOutlined,
  FavoriteBorderOutlined,
} from '@mui/icons-material';

import theme from 'src/theme';

const JobItem = () => {
  return (
    <Box
      sx={{
        border: '1px solid #c1c1c1',
        borderRadius: '4px',
        padding: 1,
      }}
    >
      <Box display="flex" gap={2}>
        <img
          width="50"
          height="50"
          alt=""
          src="https://cdn1.vieclam24h.vn/images/old_employer_avatar/images/a6146cf707fcb73596bdd6816cd94902_4525010_vieclam24h_1577928661.png?v=220513"
        />
        <Box>
          <Typography
            fontWeight="600"
            sx={{
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              fontSize: '15px',
              margin: 0,
              maxWidth: '330px',
            }}
          >
            Kinh Môn-Hải Dương_Quỳnh Phụ-Thái Bình_Bố T-Thái Bình_Bố T
          </Typography>

          <Typography fontWeight="500">
            Công Ty TNHH Manulife (Việt Nam){' '}
          </Typography>
        </Box>
      </Box>
      <Box pl={7} display="flex" justifyContent="space-between">
        <Box>
          <Box display="flex" gap={1}>
            <LocationOnOutlined
              sx={{
                color: theme.palette.grey[600],
              }}
            />
            <Typography>Hà nội </Typography>
          </Box>
          <Box display="flex" gap={1}>
            <AttachMoneyOutlined
              sx={{
                color: theme.palette.grey[600],
              }}
            />
            <Typography>11 - 30 triệu </Typography>
          </Box>
          <Box display="flex" gap={1}>
            <BusinessCenterOutlined
              sx={{
                color: theme.palette.grey[600],
              }}
            />
            <Typography>1 năm </Typography>
          </Box>
        </Box>
        <IconButton>
          <FavoriteBorderOutlined />
        </IconButton>
      </Box>
    </Box>
  );
};

const JobSugget = () => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography fontWeight="600" fontSize="20px">
        Việc làm tương tự cho bạn
      </Typography>
      {Array(6)
        .fill(6)
        .map((item) => (
          <JobItem />
        ))}
    </Box>
  );
};

export default JobSugget;
