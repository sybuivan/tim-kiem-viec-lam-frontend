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
  AllInboxOutlined,
  PostAddOutlined,
  ListAltOutlined,
  BadgeOutlined,
  PeopleOutlined,
  PersonSearchOutlined,
  MedicalInformationOutlined,
  ShoppingCartOutlined,
  HistoryOutlined,
  ContactsOutlined,
  DomainOutlined,
} from '@mui/icons-material';
import DomainOutlinedIcon from '@mui/icons-material/DomainOutlined';
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
          name: 'NTD đang theo dõi',
          path: '/thong-tin-ca-nhan/danh-sach-theo-doi',
        },
      ],
    },
  ],
};

export const CCompanyRoute: {
  data: ICustomAccordion[];
} = {
  data: [
    {
      icon: (
        <ContactsOutlined
          sx={{
            color: `${theme.palette.common.black}!important`,
          }}
        />
      ),
      accordionSummary: 'Quản lý hồ sơ công ty',
      accordionDetails: [
        {
          icon: <DomainOutlined />,
          name: 'Hồ sơ giới thiệu công ty',
          path: '/company/home/ho-so-cong-ty',
        },
      ],
    },
    {
      icon: (
        <AllInboxOutlined
          sx={{
            color: `${theme.palette.common.black}!important`,
          }}
        />
      ),
      accordionSummary: 'Quản lý đăng tuyển dụng',
      accordionDetails: [
        {
          icon: <PostAddOutlined />,
          name: 'Tạo tin tuyển dụng',
          path: '/company/home/tao-tin-tuyen-dung',
        },
        {
          icon: <ListAltOutlined />,
          name: 'Danh sách đăng tin',
          path: '/company/home/danh-sach-dang-tin',
        },
      ],
    },
    {
      icon: (
        <BadgeOutlined
          sx={{
            color: `${theme.palette.common.black}!important`,
          }}
        />
      ),
      accordionSummary: 'Quản lý ứng viên',
      accordionDetails: [
        {
          icon: <PeopleOutlined />,
          name: 'Hồ sơ ứng tuyển',
          path: '/company/home/ho-so-ung-tuyen',
        },
        {
          icon: <FavoriteOutlined />,
          name: 'Hồ đã lưu',
          path: '/company/home/ho-so-da-luu',
        },
        {
          icon: <PersonSearchOutlined />,
          name: 'Tìm kiếm ứng viên',
          path: '/company/home/tim-kiem-ung-vien',
        },
      ],
    },
    {
      icon: (
        <MedicalInformationOutlined
          sx={{
            color: `${theme.palette.common.black}!important`,
          }}
        />
      ),
      accordionSummary: 'Quản lý dịch vụ',
      accordionDetails: [
        {
          icon: <ShoppingCartOutlined />,
          name: 'Mua dịch vụ',
          path: '/company/home/mua-dich-vu',
        },
        {
          icon: <HistoryOutlined />,
          name: 'Lịch sử mua hàng',
          path: '/company/home/lich-su-mua-hang',
        },
      ],
    },
  ],
};
