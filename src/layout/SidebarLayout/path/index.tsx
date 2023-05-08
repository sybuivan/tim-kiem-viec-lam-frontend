import React from 'react';
import {
  Groups2Outlined,
  ListAltOutlined,
  BallotOutlined,
  NoteAddOutlined,
  HowToRegOutlined,
} from '@mui/icons-material';
interface IPathSideBar {
  subheader?: string;
  children: {
    icon: React.ReactNode;
    label: string;
    to: string;
  }[];
}
export const CPathSideBar: IPathSideBar[] = [
  {
    subheader: 'Quản lý người dùng',
    children: [
      {
        icon: <Groups2Outlined />,
        label: 'Quản lý người dùng',
        to: '/admin/management-user',
      },
    ],
  },
  {
    subheader: 'Quản lý nhà tuyển dụng',
    children: [
      {
        icon: <ListAltOutlined />,
        label: 'Danh sách nhà tuyển dụng',
        to: '/admin/list-company',
      },
      {
        icon: <HowToRegOutlined />,
        label: 'Danh sách đăng ký',
        to: '/admin/list-register-company',
      },
    ],
  },
  {
    subheader: 'Quản lý bài viết',
    children: [
      {
        icon: <NoteAddOutlined />,
        label: 'Thêm mới bài viết',
        to: '/admin/add-post',
      },
      {
        icon: <ListAltOutlined />,
        label: 'Danh sách bài viết',
        to: '/admin/list-post',
      },
    ],
  },
  {
    subheader: 'Cài đặt hệ thống',
    children: [
      {
        icon: <NoteAddOutlined />,
        label: 'Cài đặt chung',
        to: '/admin/add-post',
      },
      {
        icon: <ListAltOutlined />,
        label: 'Ảnh',
        to: '/admin/list-post',
      },
    ],
  },
];
