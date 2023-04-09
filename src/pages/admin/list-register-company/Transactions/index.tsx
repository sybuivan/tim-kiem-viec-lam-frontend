import PageHeader from './PageHeader';
import { Grid, Container } from '@mui/material';

import RecentOrders from './RecentOrders';

function ApplicationsTransactions() {
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

export default ApplicationsTransactions;
