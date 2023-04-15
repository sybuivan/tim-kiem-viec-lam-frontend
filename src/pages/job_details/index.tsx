import React, { useEffect } from 'react';

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
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { getJobById } from 'src/redux_store/job/job_action';

const JobDetails = () => {
  const { id_job } = useParams();
  const dispatch = useAppDispatch();
  const { jobDetail } = useAppSelector((state) => state.jobSlice);
  const onTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    dispatch(getJobById(id_job + ''));

    onTop();
  }, [id_job]);

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
        <Typography color="text.primary">{jobDetail.name_job}</Typography>
      </Breadcrumbs>

      <Grid container columnSpacing={4}>
        <Grid item xs={8}>
          <Paper
            sx={{
              p: 4,

              mb: 4,
            }}
          >
            <JobInfo jobDetail={jobDetail} />
          </Paper>
          <Paper
            sx={{
              p: 4,
            }}
          >
            <JobDescription
              required_job={jobDetail.required_job}
              description_job={jobDetail.description_job}
              benefits_job={jobDetail.benefits_job}
              id_job={jobDetail.id_job}
            />
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
