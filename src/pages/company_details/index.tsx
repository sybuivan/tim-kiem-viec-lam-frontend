import React, { useEffect } from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import theme from 'src/theme';

import { LocationOnOutlined } from '@mui/icons-material';
import CompanyInfo from './company_info';
import JobList from './job_list';
import CompanyIntro from './company_intro';
import { getCompanyById } from 'src/redux_store/company/company_action';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { useParams } from 'react-router';

const CompanyDetails = () => {
  const dispatch = useAppDispatch();
  const { id_company } = useParams<string>();
  const {
    companyDetail: {
      company: { address },
    },
  } = useAppSelector((state) => state.companySlice);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getCompanyById(id_company + ''));
  }, []);

  return (
    <Box>
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
                <Typography>{address}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyDetails;
