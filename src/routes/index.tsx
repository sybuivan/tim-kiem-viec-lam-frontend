import { RouteObject } from 'react-router';
import MainLayout from 'src/layout/main_layout';
import CompanyLayout from 'src/layout/company_layout';
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
import ProfileOnline from 'src/pages/profile/profile_document/profile_online';
import { PrivateUser } from './private/user';
import RegisterFormCompany from 'src/pages/auth_company/register_form_company';
import LoginFormCompany from 'src/pages/auth_company/login_form_company';
import { PrivateCompany, PrivateLoginCompany } from './private/company';
import HomeCompany from 'src/pages/home_company';
import CompanyInfoAdmin from 'src/pages/home_company/company_info';
import CreateJobPostings from 'src/pages/home_company/create_post';
import PostingList from 'src/pages/home_company/posting_list';
import UpdateJobPostings from 'src/pages/home_company/update_post';
import ApplyList from 'src/pages/home_company/apply_list';
import SavedProfile from 'src/pages/home_company/saved_profile';
import CandidateList from 'src/pages/home_company/candidate_list';
import BuyServices from 'src/pages/home_company/buy_services';
import PurchaseHistory from 'src/pages/home_company/purchase_history';
import Message from 'src/pages/message';
import { ContentMessage } from 'src/pages/message/content_message';
import SidebarLayout from 'src/layout/SidebarLayout';
import Dashboard from 'src/pages/admin/dashboard';
import ManagementUser from 'src/pages/admin/management-user';
import ListCompany from 'src/pages/admin/list-company';
import ListRegisterCompany from 'src/pages/admin/list-register-company';
import AddPost from 'src/pages/admin/add-post';
import ListPost from 'src/pages/admin/list-post';

let routes: (token: string) => RouteObject[] = (token: string) => [
  {
    path: '/',
    element: (
      <PrivateCompany>
        <MainLayout />
      </PrivateCompany>
    ),
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
        path: '/viec-lam/:id_job',
        element: <JobDetails />,
      },
      {
        path: '/cong-ty/:id_company',
        element: <CompanyDetails />,
      },
      {
        path: '/thong-tin-ca-nhan',
        element: (
          <PrivateUser token={token}>
            <Profile />
          </PrivateUser>
        ),
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
          {
            path: 'ho-so-dinh-kem',
            element: <ProfileOnline />,
          },
        ],
      },
    ],
  },
  {
    path: '/company',
    element: <CompanyLayout />,
    children: [
      {
        index: true,
        element: (
          <PrivateCompany>
            <RegisterFormCompany />
          </PrivateCompany>
        ),
      },
      {
        path: 'login',
        element: (
          <PrivateCompany>
            <LoginFormCompany />
          </PrivateCompany>
        ),
      },
      {
        path: 'message',
        element: (
          <PrivateLoginCompany>
            <Message />
          </PrivateLoginCompany>
        ),
        children: [
          {
            path: ':id_user',
            element: <ContentMessage />,
          },
        ],
      },
      {
        path: 'home',
        element: (
          <PrivateLoginCompany>
            <HomeCompany />
          </PrivateLoginCompany>
        ),
        children: [
          {
            path: 'ho-so-cong-ty',
            element: <CompanyInfoAdmin />,
          },
          {
            path: 'tao-tin-tuyen-dung',
            element: <CreateJobPostings />,
          },
          {
            path: 'chinh-sua-tin-tuyen-dung/:id_job',
            element: <UpdateJobPostings />,
          },
          {
            path: 'danh-sach-dang-tin',
            element: <PostingList />,
          },
          {
            path: 'ho-so-ung-tuyen',
            element: <ApplyList />,
          },
          {
            path: 'ho-so-da-luu',
            element: <SavedProfile />,
          },
          {
            path: 'tim-kiem-ung-vien',
            element: <CandidateList />,
          },
          {
            path: 'mua-dich-vu',
            element: <BuyServices />,
          },
          {
            path: 'lich-su-mua-hang',
            element: <PurchaseHistory />,
          },
        ],
      },
    ],
  },

  {
    path: 'admin',
    element: <SidebarLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'management-user',
        element: <ManagementUser />,
      },
      {
        path: 'list-company',
        element: <ListCompany />,
      },
      {
        path: 'list-register-company',
        element: <ListRegisterCompany />,
      },
      {
        path: 'add-post',
        element: <AddPost />,
      },
      {
        path: 'list-post',
        element: <ListPost />,
      },
    ],
  },
];

export default routes;
