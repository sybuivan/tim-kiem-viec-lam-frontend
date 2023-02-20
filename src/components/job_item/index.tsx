import { Box, Typography, Grid, IconButton } from '@mui/material';
import React from 'react';
import {
  LocationOnOutlined,
  PaidOutlined,
  FavoriteBorderOutlined,
} from '@mui/icons-material';
import { IJob } from 'src/types/job';
import theme from 'src/theme';

const JobItem = ({ jobItem }: { jobItem: IJob }) => {
  return (
    <Grid item xs={4}>
      <Box
        sx={{
          border: '1px solid #c1c1c1',
          borderRadius: '4px',
          padding: 1,
          '&:hover': {
            border: `1px solid ${theme.palette.primary.dark}`,
            cursor: 'pointer',
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight="600">{jobItem.nameJob}</Typography>
          <IconButton>
            <FavoriteBorderOutlined />
          </IconButton>
        </Box>

        <Box display="flex" gap={1}>
          <img alt="" src={jobItem.avatar} width="88" height="88" />

          <Box>
            <Typography
              pb={2.5}
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
