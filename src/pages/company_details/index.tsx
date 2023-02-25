import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import theme from 'src/theme';

import {
  LocationOnOutlined,
  Groups2Outlined,
  FactoryOutlined,
  HourglassBottomOutlined,
} from '@mui/icons-material';
import CompanyInfo from './company_info';
import JobList from './job_list';
import CompanyIntro from './company_intro';

const CompanyDetails = () => {
  return (
    <Box bgcolor="#ebe5e5">
      <CompanyInfo />
      <Grid
        container
        sx={{
          maxWidth: '1000px!important',
          margin: 'auto',
        }}
        columnSpacing={1}
      >
        <Grid item xs={9}>
          <JobList />

          <CompanyIntro />
        </Grid>
        <Grid item xs={3}>
          <Paper
            sx={{
              mt: 5,
              padding: 2,
            }}
          >
            <Box width="100%" display="flex">
              <Box width="100%">
                <Box display="flex" flex="1" alignItems="flex-start" gap={1}>
                  <LocationOnOutlined
                    sx={{
                      color: theme.palette.grey[600],
                    }}
                  />
                  <Typography
                    sx={{
                      color: theme.palette.grey[600],
                      minWidth: '70px',
                    }}
                  >
                    Địa chỉ
                  </Typography>
                </Box>
                <Typography>
                  Số 55 Đường Số 1, Khu Dân Cư City land, Phường 7, Quận Gò Vấp,
                  TP. HCM
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyDetails;
