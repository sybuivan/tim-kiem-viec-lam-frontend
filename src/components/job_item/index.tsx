import { Box, Typography, Grid, IconButton } from '@mui/material';
import React from 'react';
import {
  LocationOnOutlined,
  PaidOutlined,
  FavoriteBorderOutlined,
} from '@mui/icons-material';
import { IJob } from 'src/types/job';
import theme from 'src/theme';
import { useNavigate } from 'react-router';

interface IJobItem {
  jobItem: IJob;
  col?: number;
  isPage?: boolean;
}

const JobItem = (props: IJobItem) => {
  const { jobItem, col = 4, isPage = false } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/viec-lam/123');
  };

  return (
    <Grid item xs={col}>
      <Box
        sx={{
          border: '1px solid #c1c1c1',
          borderRadius: '4px',
          padding: 1,
          '&:hover': {
            border: `1px solid ${theme.palette.primary.dark}`,
            cursor: 'pointer',
          },
          backgroundColor: isPage ? '#fff5e7' : theme.palette.common.white,
        }}
        onClick={handleClick}
      >
        {!isPage && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight="600">{jobItem.nameJob}</Typography>
            <IconButton>
              <FavoriteBorderOutlined />
            </IconButton>
          </Box>
        )}

        <Box display="flex" gap={1}>
          <img alt="" src={jobItem.avatar} width="88" height="88" />

          <Box flex="1">
            {isPage && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography fontWeight="600">{jobItem.nameJob}</Typography>
                <IconButton>
                  <FavoriteBorderOutlined />
                </IconButton>
              </Box>
            )}
            <Typography
              pb={isPage ? 1 : 2.5}
              color={theme.palette.grey[600]}
              fontWeight="600"
            >
              {jobItem.nameCompany}
            </Typography>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <PaidOutlined />
                {jobItem.nameRange}
              </Typography>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <LocationOnOutlined />

                {jobItem.location}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default JobItem;
