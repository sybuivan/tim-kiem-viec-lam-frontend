import {
  ManageAccountsOutlined,
  ArticleOutlined,
  GradingOutlined,
  FavoriteOutlined,
  ContentPasteSearchOutlined,
  ApartmentOutlined,
  AccountBoxOutlined,
  AssignmentIndOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import { ICustomAccordion } from 'src/types/profile';
import theme from 'src/theme';

export const CProfileRoute: {
  data: ICustomAccordion[];
} = {
  data: [
    {
      icon: (
        <AccountBoxOutlined
          sx={{
            color: `${theme.palette.common.black}!important`,
          }}
        />
      ),
      accordionSummary: 'Quản lý tài khoản',
      accordionDetails: [
        {
          icon: <ManageAccountsOutlined />,
          name: 'Tài khoản của bạn',
          path: '/thong-tin-ca-nhan',
        },
      ],
    },
    {
      icon: (
        <AssignmentIndOutlined
          sx={{
            color: `${theme.palette.common.black}!important`,
          }}
        />
      ),
      accordionSummary: 'Quản lý hồ sơ',
      accordionDetails: [
        {
          icon: <ArticleOutlined />,
          name: 'Hồ sơ của bạn',
          path: '/thong-tin-ca-nhan/ho-so',
          nested: '/thong-tin-ca-nhan/ho-so-dinh-kem',
        },
      ],
    },
    {
      icon: (
        <WorkOutlineOutlined
          sx={{
            color: `${theme.palette.common.black}!important`,
          }}
        />
      ),
      accordionSummary: 'Quản lý việc làm',
      accordionDetails: [
        {
          icon: <GradingOutlined />,
          name: 'Việc làm đã ứng tuyển',
          path: '/thong-tin-ca-nhan/viec-lam-da-ung-tuyen',
        },
        {
          icon: <FavoriteOutlined />,
          name: 'Việc làm đã lưu',
          path: '/thong-tin-ca-nhan/viec-lam-da-luu',
        },
      ],
    },
    {
      icon: (
        <ApartmentOutlined
          sx={{
            color: `${theme.palette.common.black}!important`,
          }}
        />
      ),
      accordionSummary: 'Nhà tuyển dụng quan tâm',
      accordionDetails: [
        {
          icon: <ContentPasteSearchOutlined />,
          name: 'Nhà tuyển dụng đang theo dõi',
          path: '/thong-tin-ca-nhan/danh-sach-theo-doi',
        },
      ],
    },
  ],
};
