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
import { LightModeOutlined } from '@mui/icons-material';
import { getSuggetJobForYou } from 'src/redux_store/user/user_action';
import JobSuggetForYou from './job_sugget_for_you';

const Home = () => {
  const dispatch = useAppDispatch();
  const {
    token,
    jobSuggets: { job_suggets_for_you },
  } = useAppSelector((state) => state.userSlice);

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

  useEffect(() => {
    if (token) dispatch(getSuggetJobForYou());
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
        {token && (
          <JobSuggetForYou
            jobList={job_suggets_for_you}
            icon={
              <LightModeOutlined
                sx={{
                  color: theme.palette.primary.main,
                  fontSize: '30px',
                }}
              />
            }
            title="Việc làm gợi ý"
          />
        )}

        <PostList />
      </Container>
    </div>
  );
};

export default Home;
