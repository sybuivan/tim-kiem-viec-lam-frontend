import { Box, Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import { CCompanyRoute } from 'src/constants/profile';
import { useAppSelector, useAppDispatch } from 'src/hooks';
import { getAllField } from 'src/redux_store/common/field/field_actions';
import { checkRoleCompany } from 'src/utils/common';
import ProfileBar from '../../components/profile_bar';

const HomeCompany = () => {
  const { me, token } = useAppSelector((state) => state.companySlice);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (checkRoleCompany(me?.id_role, token)) {
      dispatch(getAllField());
    }
  }, []);

  return (
    <Box>
      <Container
        sx={{
          height: '100%',
          minWidth: '1600px',
          paddingLeft: '0!important',
          overflowX: 'hidden',
          minHeight: '30px',
        }}
      >
        <Grid container columnSpacing={2}>
          <Grid item xs={2.5}>
            <Box position="fixed">
              <ProfileBar data={CCompanyRoute.data} />
            </Box>
          </Grid>
          <Grid item xs={7.5}>
            <Box minHeight="90vh">
              <Outlet />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomeCompany;
