import {
  AttachMoneyOutlined,
  FavoriteBorderOutlined,
  HourglassBottomOutlined,
  LocationOnOutlined,
  FavoriteOutlined,
} from '@mui/icons-material';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { Box, IconButton, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useAppSelector } from 'src/redux_store';
import theme from 'src/theme';
import { IJob } from 'src/types/job';

export const JobCompany = ({
  isSave,
  job,
}: {
  isSave?: boolean;
  job?: IJob;
}) => {
  return (
    <Box
      px={2}
      py={2}
      mb={0.4}
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
          {job?.name_job}
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
          <Typography>{job?.work_location}</Typography>
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
          <Typography>{job?.name_range}</Typography>
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
          <Typography>{moment(job?.deadline).format('DD/MM-YYYY')} </Typography>
        </Box>
      </Box>
    </Box>
  );
};
