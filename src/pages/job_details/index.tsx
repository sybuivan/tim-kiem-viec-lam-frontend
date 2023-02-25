import React from 'react';
import {
  Container,
  Paper,
  Breadcrumbs,
  Link,
  Typography,
  Grid,
} from '@mui/material';
import JobInfo from './job_info';
import JobDescription from './job_description';
import JobSugget from './job_sugget';

const JobDetails = () => {
  return (
    <Container sx={{ maxWidth: '1500px!important' }}>
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          my: 2,
        }}
      >
        <Link underline="hover" color="inherit" href="/">
          Trang chủ
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          Việc làm
        </Link>
        <Typography color="text.primary">
          Nhân Viên Hỗ Trợ Khách Hàng App Food (Không Sales - Không Áp Số - Cung
          Cấp Thiết Bị Làm Việc)
        </Typography>
      </Breadcrumbs>

      <Grid container columnSpacing={4}>
        <Grid item xs={8}>
          <Paper
            sx={{
              p: 4,

              mb: 4,
            }}
          >
            <JobInfo />
          </Paper>
          <Paper
            sx={{
              p: 4,
            }}
          >
            <JobDescription />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <JobSugget />
        </Grid>
      </Grid>
    </Container>
  );
};

export default JobDetails;
