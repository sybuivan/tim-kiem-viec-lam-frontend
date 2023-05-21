export const CGenderOption: {}[] = [
  {
    value: 'Nam',
    label: 'Nam',
  },
  {
    value: 'Nữ',
    label: 'Nữ',
  },
];

export const CPersonnelSize: {}[] = [
  {
    value: 'Dưới 10 người ',
  },
  {
    value: '10-150 người ',
  },
  {
    value: '150-300 người ',
  },
  {
    value: 'Trên 300 người ',
  },
];

export const ROLE_COMPANY = 'company';
export const ROLE_USER = 'user';
export const ROLE_ADMIN = 'admin';

export const COptionStatusApply = [
  {
    label: 'Đã xem hồ sơ',
    status: 1,
  },
  {
    label: 'Đã liên hệ',
    status: 2,
  },
  {
    label: 'Đã test',
    status: 3,
  },
  {
    label: 'Từ chối',
    status: 4,
  },
];

export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
