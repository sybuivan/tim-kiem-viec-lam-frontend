import { RouteObject } from 'react-router';
import MainLayout from 'src/layout/main_layout';
import Home from 'src/pages/home';
import JobDetails from 'src/pages/job_details';
import JobList from 'src/pages/job_list';
import CompanyDetails from 'src/pages/company_details';
import Profile from 'src/pages/profile';
import ProfileUser from 'src/pages/profile/profile_user';
import ProfileDocument from 'src/pages/profile/profile_document';
import JobApplied from 'src/pages/profile/job_applied';
import JobSaved from 'src/pages/profile/job_saved';
import CompanyFollow from 'src/pages/profile/company_follow';

let routes: (isLogin: boolean) => RouteObject[] = (isLogin?: boolean) => [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/co-hoi-viec-lam',
        element: <JobList />,
      },
      {
        path: '/viec-lam/:id',
        element: <JobDetails />,
      },
      {
        path: '/cong-ty/:id',
        element: <CompanyDetails />,
      },
      {
        path: '/thong-tin-ca-nhan',
        element: <Profile />,
        children: [
          {
            index: true,
            element: <ProfileUser />,
          },
          {
            path: 'ho-so',
            element: <ProfileDocument />,
          },
          {
            path: 'viec-lam-da-ung-tuyen',
            element: <JobApplied />,
          },
          {
            path: 'viec-lam-da-luu',
            element: <JobSaved />,
          },
          {
            path: 'danh-sach-theo-doi',
            element: <CompanyFollow />,
          },
        ],
      },
    ],
  },
];

export default routes;
