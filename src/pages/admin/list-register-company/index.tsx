import React, { useEffect } from 'react';
import { Grid, Container } from '@mui/material';

import RecentOrders from './Transactions/RecentOrders';
import { useAppDispatch, useGetStatus } from 'src/hooks';
import { getCompanyRegister } from 'src/redux_store/admin/admin_actions';
import LoadingLinear from 'src/components/loading/loading_linear';

function ListRegisterCompany() {
  const dispatch = useAppDispatch();
  const [isLoading] = useGetStatus('admin', 'getCompanyRegister');
  useEffect(() => {
    dispatch(getCompanyRegister());
  }, []);

  if (isLoading) return <LoadingLinear />;

  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <RecentOrders />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ListRegisterCompany;
