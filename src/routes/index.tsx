import { RouteObject } from 'react-router';
import MainLayout from 'src/layout/main_layout';
import Home from 'src/pages/home';
import JobDetails from 'src/pages/job_details';
import JobList from 'src/pages/job_list';
import CompanyDetails from 'src/pages/company_details';

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
    ],
  },
];

export default routes;
