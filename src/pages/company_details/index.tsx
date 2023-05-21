import { LocationOnOutlined } from '@mui/icons-material';
import { Box, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';

import MapAddress from 'src/components/map_address';
import { useAppDispatch, useAppSelector, useIsRequestPending } from 'src/hooks';
import { getCompanyById } from 'src/redux_store/company/company_action';
import theme from 'src/theme';
import CompanyInfo from './company_info';
import CompanyIntro from './company_intro';
import JobList from './job_list';
import LoadingAnimation from 'src/components/loading/loading_animation';

const CompanyDetails = () => {
  const dispatch = useAppDispatch();
  const { id_company } = useParams<string>();
  const isLoading = useIsRequestPending('company', 'getCompanyById');
  const {
    companyDetail: {
      company: { address, lat, lng },
    },
  } = useAppSelector((state) => state.companySlice);
  useEffect(() => {
    dispatch(getCompanyById(id_company + ''));
  }, []);

  if (isLoading) return <LoadingAnimation />;

  return (
    <Box>
      <CompanyInfo />
      <Grid
        container
        sx={{
          maxWidth: '1200px!important',
          margin: 'auto',
        }}
        columnSpacing={1}
      >
        <Grid item xs={8}>
          <JobList />

          <CompanyIntro />
        </Grid>
        <Grid item xs={4}>
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

            <Box mt={2}>{lat && lng && <MapAddress lat={lat} lng={lng} />}</Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyDetails;
