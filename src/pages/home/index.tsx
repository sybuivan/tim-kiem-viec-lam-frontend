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
import {
  getJobList,
  getTopJob,
  getJobNews,
} from 'src/redux_store/job/job_action';
import { LightModeOutlined } from '@mui/icons-material';
import JobSuggetForYou from './job_sugget_for_you';
import ListDiscover from './list_discover';
import { getAllPosts } from 'src/redux_store/post/post_actions';

const CLIMIT: number = 6;

const Home = () => {
  const dispatch = useAppDispatch();
  const {
    jobSuggets: { job_suggets_for_you },
  } = useAppSelector((state) => state.userSlice);
  const { token } = useAppSelector((state) => state.authSlice);

  const {
    companyList: { companyList },
  } = useAppSelector((state) => state.companySlice);
  const {
    jobList: { data },
    jobTop,
    jobNews,
  } = useAppSelector((state) => state.jobSlice);

  useEffect(() => {
    dispatch(getCompanyList(CLIMIT));
    dispatch(getJobList());
    dispatch(getAllPosts());
    dispatch(getTopJob());
    dispatch(getJobNews());
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
          <JobList
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
        {/* <JobList
          jobList={jobNews.data}
          icon={
            <LightModeOutlined
              sx={{
                color: theme.palette.primary.main,
                fontSize: '30px',
              }}
            />
          }
          title="Việc làm mới đăng"
        /> */}
        <ListDiscover
          list={jobTop.data}
          icon={
            <LightModeOutlined
              sx={{
                color: theme.palette.primary.main,
                fontSize: '30px',
              }}
            />
          }
          title="Top nhóm ngành nổi bật"
        />

        <PostList />
      </Container>
    </div>
  );
};

export default Home;
