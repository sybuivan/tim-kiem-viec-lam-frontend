import React from 'react';
import { Grid, Container } from '@mui/material';

import RecentOrders from './Transactions/RecentOrders';

function ListRegisterCompany() {
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