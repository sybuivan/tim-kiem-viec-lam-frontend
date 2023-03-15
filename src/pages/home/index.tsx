import { Container } from '@mui/material';
import React, { useEffect } from 'react';
import Slider from 'src/components/silder';
import CompanyList from './company_list';
import { useAppDispatch, useAppSelector } from 'src/hooks';
import { getCompanyList } from 'src/redux_store/company/company_action';
import JobList from './job_list';
import { QueryBuilderOutlined } from '@mui/icons-material';
import theme from 'src/theme';
import PostList from './post_list';
import { getJobList } from 'src/redux_store/job/job_action';

const Home = () => {
  const dispatch = useAppDispatch();

  const {
    companyList: { companyList },
  } = useAppSelector((state) => state.companySlice);
  const {
    jobList: { data },
  } = useAppSelector((state) => state.jobSlice);

  useEffect(() => {
    dispatch(getCompanyList());
    dispatch(getJobList());
  }, []);

  return (
    <div>
      <Slider />
      <Container
        sx={{
          maxWidth: '1500px!important',
        }}
      >
        <CompanyList dataList={companyList} />
        <JobList
          jobList={data}
          icon={
            <QueryBuilderOutlined
              sx={{
                color: theme.palette.primary.main,
                fontSize: '30px',
              }}
            />
          }
          title="Việc làm tuyển gấp"
        />
        {/*
        <JobList
          jobList={dataJobs}
          icon={
            <LightModeOutlined
              sx={{
                color: theme.palette.primary.main,
                fontSize: '30px',
              }}
            />
          }
          title="Việc làm gợi ý"
        /> */}

        <PostList />
      </Container>
    </div>
  );
};

export default Home;
