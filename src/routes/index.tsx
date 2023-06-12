import { RouteObject } from 'react-router';
import { io } from 'socket.io-client';
import Page404 from 'src/components/notfound';
import CompanyLayout from 'src/layout/company_layout';
import MainLayout from 'src/layout/main_layout';
import SidebarLayout from 'src/layout/SidebarLayout';
import AuthLogin from 'src/pages/admin/auth_login';
import Dashboard from 'src/pages/admin/dashboard';
import ListCompany from 'src/pages/admin/list-company';
import ManagementPostList from 'src/pages/admin/list-post';
import PostAdd from 'src/pages/admin/list-post/post-add';
import PostEdit from 'src/pages/admin/list-post/post-edit';
import ListRegisterCompany from 'src/pages/admin/list-register-company';
import ManagementUser from 'src/pages/admin/management-user';
import SettingImage from 'src/pages/admin/setting_image';
import SettingSystem from 'src/pages/admin/setting_system';
import LoginFormCompany from 'src/pages/auth_company/login_form_company';
import RegisterFormCompany from 'src/pages/auth_company/register_form_company';
import CompanyDetails from 'src/pages/company_details';
import Home from 'src/pages/home';
import HomeCompany from 'src/pages/home_company';
import ApplyList from 'src/pages/home_company/apply_list';
import BuyServices from 'src/pages/home_company/buy_services';
import CandidateList from 'src/pages/home_company/candidate_list';
import CompanyInfoAdmin from 'src/pages/home_company/company_info';
import ChooseService from 'src/pages/home_company/create_post/choose_service';
import PostingList from 'src/pages/home_company/posting_list';
import PurchaseHistory from 'src/pages/home_company/purchase_history';
import SavedProfile from 'src/pages/home_company/saved_profile';
import UpdateJobPostings from 'src/pages/home_company/update_post';
import JobDetails from 'src/pages/job_details';
import JobList from 'src/pages/job_list';
import CompanyList from 'src/pages/company_list';
import Message from 'src/pages/message';
import { ContentMessage } from 'src/pages/message/content_message';
import NewsDetails from 'src/pages/news';
import Profile from 'src/pages/profile';
import CompanyFollow from 'src/pages/profile/company_follow';
import JobApplied from 'src/pages/profile/job_applied';
import JobSaved from 'src/pages/profile/job_saved';
import ProfileDocument from 'src/pages/profile/profile_document';
import { default as ProfileOnline } from 'src/pages/profile/profile_document/profile_online';
import UpdateProfileOnline from 'src/pages/profile/profile_document/update_profile_online';
import ProfileUser from 'src/pages/profile/profile_user';
import { PrivateAdmin, PrivateDashboard } from './private/admin';
import { PrivateCompany, PrivateLoginCompany } from './private/company';
import { PrivateUser } from './private/user';
import { baseURL } from 'src/config';
import NewList from 'src/pages/new_list';

const socket = io(baseURL);

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
        path: '/danh-sach-cong-ty',
        element: <CompanyList />,
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
        path: '/tin-tuc',
        element: <NewList />,
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
            element: <ProfileOnline />,
          },
          {
            path: 'ho-so-dinh-kem/:id_profile',
            element: <UpdateProfileOnline />,
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
      {
        path: 'setting-system',
        element: <SettingSystem />,
      },
      {
        path: 'setting-image',
        element: <SettingImage />,
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
