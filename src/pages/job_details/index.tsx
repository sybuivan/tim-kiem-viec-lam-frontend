import React, { useEffect, useState } from 'react';

import {
  Container,
  Paper,
  Breadcrumbs,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import JobInfo from './job_info';
import JobDescription from './job_description';
import JobSugget from './job_sugget';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector, useGetStatus } from 'src/hooks';
import { getJobById } from 'src/redux_store/job/job_action';
import LoadingAnimation from 'src/components/loading/loading_animation';
import Error from 'src/components/error';

const JobDetails = () => {
  const { id_job } = useParams();
  const dispatch = useAppDispatch();
  const [isLoading, isError] = useGetStatus('job', 'getJobById');
  const [error, setError] = useState<string>('');
  const {
    jobDetail: { job, job_suggets },
  } = useAppSelector((state) => state.jobSlice);

  const onTop = () => {
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    if (isError)
      return (
        <Box>
          <Error title={error} />
        </Box>
      );

    if (isLoading) return <LoadingAnimation />;

    return (
      <Grid container columnSpacing={4}>
        <Grid item lg={8} sm={12} md={12} xs={12}>
          <Paper
            sx={{
              p: 4,

              mb: 4,
            }}
          >
            <JobInfo jobDetail={job} />
          </Paper>
          <Paper
            sx={{
              p: 4,
            }}
          >
            <JobDescription job={job} />
          </Paper>
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <JobSugget job_suggets={job_suggets} />
        </Grid>
      </Grid>
    );
  };

  useEffect(() => {
    dispatch(getJobById(id_job + ''))
      .unwrap()
      .catch((err) => {
        setError(err.message);
      });

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
        <Link to="/">Trang chủ</Link>
        <Link to="/co-hoi-viec-lam">Việc làm</Link>
        {job.name_job && (
          <Typography color="text.primary">{job.name_job}</Typography>
        )}
      </Breadcrumbs>
      {renderContent()}
    </Container>
  );
};

export default JobDetails;
