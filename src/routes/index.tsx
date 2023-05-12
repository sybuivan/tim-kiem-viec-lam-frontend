import { Navigate, RouteObject } from 'react-router';
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
import AuthLogin from 'src/pages/admin/auth_login';
import { io } from 'socket.io-client';
import { PrivateAdmin, PrivateDashboard } from './private/admin';
import CreateProfileOnline from 'src/pages/profile/profile_document/create_profile_online';
import Page404 from 'src/components/notfound';
import ChooseService from 'src/pages/home_company/create_post/choose_service';
import PostList from 'src/pages/home/post_list';
import PostAdd from 'src/pages/admin/list-post/post-add';
import PostEdit from 'src/pages/admin/list-post/post-edit';
import ManagementPostList from 'src/pages/admin/list-post';
import NewsDetails from 'src/pages/news';

const socket = io('http://localhost:5000');

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
        path: 'users/message',
        element: (
          <PrivateUser token={token}>
            <Message />
          </PrivateUser>
        ),
        children: [
          {
            path: ':id_room_message',
            element: <ContentMessage socket={socket} />,
          },
        ],
      },
      {
        path: '/co-hoi-viec-lam',
        element: <JobList />,
      },
      {
        path: '/bai-dang-chi-tiet/:id_post',
        element: <NewsDetails />,
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
            path: 'them-moi-ho-so',
            element: <CreateProfileOnline />,
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
            path: ':id_room_message',
            element: <ContentMessage socket={socket} />,
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
            path: 'chon-dich-vu',
            element: <ChooseService />,
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
            element: <ApplyList socket={socket} />,
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

    element: (
      <PrivateDashboard>
        <SidebarLayout />
      </PrivateDashboard>
    ),
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
        element: <PostAdd />,
      },
      {
        path: 'edit-post/:id_post',
        element: <PostEdit />,
      },
      {
        path: 'list-post',
        element: <ManagementPostList />,
      },
    ],
  },

  {
    path: 'auth/admin/login',
    element: (
      <PrivateAdmin>
        <AuthLogin />
      </PrivateAdmin>
    ),
  },
  {
    path: '*',
    element: <Page404 />,
  },
];

export default routes;
