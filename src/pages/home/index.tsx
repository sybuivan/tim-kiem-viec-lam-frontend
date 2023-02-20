import { Container } from '@mui/material';
import React from 'react';
import Slider from 'src/components/silder';
import { ICompanyList } from 'src/types/company';
import { IJobList } from 'src/types/job';
import CompanyList from './company_list';
import JobList from './job_list';
import { QueryBuilderOutlined, LightModeOutlined } from '@mui/icons-material';
import theme from 'src/theme';
import PostList from './post_list';

const dataList: ICompanyList = {
  data: [
    {
      avatar:
        'https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fimages%2Femployer_avatar%2F2022%2F09%2F13%2Fimages%2F166303510727.w-150.h-150.png&w=96&q=75',
      totalJob: 34,
    },
    {
      avatar:
        'https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fupload%2Ffiles_cua_nguoi_dung%2Flogo%2F2019%2F02%2F12%2F1549951205_57a95198dda12_1470714264_300x300.w-150.h-150.png&w=96&q=75',
      totalJob: 70,
    },
    {
      avatar:
        'https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fimages%2Fold_employer_avatar%2Fimages%2F0c11a213f45f67450110524c8f0fef87_3104199_vieclam24h_1577951033.w-150.h-150.png&w=96&q=75',
      totalJob: 45,
    },
    {
      avatar:
        'https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fupload%2Ffiles_cua_nguoi_dung%2Fminisite%2F2018%2F08%2F01%2F1533107852_logo-quadri.w-150.h-150.jpg&w=96&q=75',
      totalJob: 45,
    },
    {
      avatar:
        'https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fupload%2Ffiles_cua_nguoi_dung%2Fminisite%2F2018%2F08%2F01%2F1533107852_logo-quadri.w-150.h-150.jpg&w=96&q=75',
      totalJob: 45,
    },
    {
      avatar:
        'https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fupload%2Ffiles_cua_nguoi_dung%2Fminisite%2F2018%2F08%2F01%2F1533107852_logo-quadri.w-150.h-150.jpg&w=96&q=75',
      totalJob: 45,
    },
  ],
};

const dataJobs: IJobList = {
  data: [
    {
      nameJob: 'Nhân Viên Kế Toán Công Nợ Phải Trả',
      location: 'TP HCM',
      nameCompany: 'Danateq',
      nameRange: '7-15tr',
      avatar:
        'https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fimages%2Femployer_avatar%2F2022%2F09%2F13%2Fimages%2F166303510727.w-150.h-150.png&w=96&q=75',
    },
    {
      nameJob: 'Nhân Viên Kế Toán Công Nợ Phải Trả',
      location: 'TP HCM',
      nameCompany: 'Danateq',
      nameRange: '7-15tr',
      avatar:
        'https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fupload%2Ffiles_cua_nguoi_dung%2Fminisite%2F2018%2F08%2F01%2F1533107852_logo-quadri.w-150.h-150.jpg&w=96&q=75',
    },
    {
      nameJob: 'Nhân Viên Kế Toán Công Nợ Phải Trả',
      location: 'TP HCM',
      nameCompany: 'Danateq',
      nameRange: '7-15tr',
      avatar:
        'https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fupload%2Ffiles_cua_nguoi_dung%2Fminisite%2F2018%2F08%2F01%2F1533107852_logo-quadri.w-150.h-150.jpg&w=96&q=75',
    },
    {
      nameJob: 'Nhân Viên Kế Toán Công Nợ Phải Trả',
      location: 'TP HCM',
      nameCompany: 'Danateq',
      nameRange: '7-15tr',
      avatar:
        'https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fimages%2Femployer_avatar%2F2022%2F09%2F13%2Fimages%2F166303510727.w-150.h-150.png&w=96&q=75',
    },
    {
      nameJob: 'Nhân Viên Kế Toán Công Nợ Phải Trả',
      location: 'TP HCM',
      nameCompany: 'Danateq',
      nameRange: '7-15tr',
      avatar:
        'https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fupload%2Ffiles_cua_nguoi_dung%2Fminisite%2F2018%2F08%2F01%2F1533107852_logo-quadri.w-150.h-150.jpg&w=96&q=75',
    },
    {
      nameJob: 'Nhân Viên Kế Toán Công Nợ Phải Trả',
      location: 'TP HCM',
      nameCompany: 'Danateq',
      nameRange: '7-15tr',
      avatar:
        'https://vieclam24h.vn/_next/image?url=https%3A%2F%2Fcdn1.vieclam24h.vn%2Fupload%2Ffiles_cua_nguoi_dung%2Fminisite%2F2018%2F08%2F01%2F1533107852_logo-quadri.w-150.h-150.jpg&w=96&q=75',
    },
  ],
  total: 100,
};

const Home = () => {
  return (
    <div>
      <Slider />
      <Container
        sx={{
          maxWidth: '1500px!important',
        }}
      >
        <CompanyList dataList={dataList} />
        <JobList
          jobList={dataJobs}
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
        />

        <PostList />
      </Container>
    </div>
  );
};

export default Home;
