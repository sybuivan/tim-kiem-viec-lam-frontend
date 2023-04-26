import moment from 'moment';

import {
  formatDistance,
  subYears,
  subDays,
  subMonths,
  subHours,
  subMinutes,
} from 'date-fns';

import { vi } from 'date-fns/locale';
import theme from 'src/theme';

export const findIndexItem = (array: any[], id: string) => {
  const index = array.findIndex((item) => item.id === id);

  return index;
};

export const formatDate = (date: string | Date) => {
  return moment(date).utc().format('DD/MM/YYYY HH:mm:ss');
};

export const convertMinMaxToArray = (
  min: number | string,
  max: number | string
): { value: number; label: string }[] => {
  if (min && max) {
    return Array.from({ length: Number(max) - Number(min) + 1 }, (v, k) => {
      return {
        value: Number(k + Number(min)),
        label: String(k + Number(min)),
      };
    });
  }

  return [];
};

export const formatFilterToString = (array: { id: string; name: string }[]) => {
  return array.map((item) => item.id).join(',');
};

export const formatPrice = (price: number) =>
  price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

export const findNameJob = (
  applied: { id_job: string; name_job: string }[],
  id_job: string
) => {
  console.log({ applied });
  const name = applied.filter((item) => item.id_job === id_job);

  return name[0].name_job;
};

export const getSubTimeFromDayFNS = (date?: string | Date) => {
  const locale = vi;
  const now = moment(); // Lấy thời điểm hiện tại
  const startDate = moment(date); // Ngày bắt đầu tính
  const diffInYears = now.diff(startDate, 'years'); // Tính số năm khác nhau
  const diffInMonths = now.diff(startDate, 'months'); // Tính số tháng khác nhau
  const diffInDays = now.diff(startDate, 'days'); // Tính số ngày khác nhau
  const diffInHours = now.diff(startDate, 'hours'); // Tính số giờ khác nhau
  const diffInMinutes = now.diff(startDate, 'minutes'); // Tính số giờ khác nhau

  if (diffInYears >= 1) {
    return formatDistance(subYears(new Date(), diffInYears), new Date(), {
      locale,
      addSuffix: true,
    });
  } else if (diffInMonths >= 1) {
    return formatDistance(subMonths(new Date(), diffInMonths), new Date(), {
      locale,
      addSuffix: true,
    });
  } else if (diffInDays >= 1) {
    return formatDistance(subDays(new Date(), diffInDays), new Date(), {
      locale,
      addSuffix: true,
    });
  } else if (diffInHours >= 1) {
    return formatDistance(subHours(new Date(), diffInHours), new Date(), {
      locale,
      addSuffix: true,
    });
  } else {
    return formatDistance(subMinutes(new Date(), diffInMinutes), new Date(), {
      locale,
      addSuffix: true,
    });
  }
};

export const convertToUSD = (vnd: number, exchangeRate: number) => {
  return (vnd / exchangeRate).toFixed(2);
};

export const renderLabelStatus = (status: number) => {
  if (status === 0) return 'Chưa xem';
  if (status === 1) return 'Đã liên hệ';
  if (status === 2) return 'Đã xem hồ sơ';
  if (status === 3) return 'Từ chối';
};
export const renderColorStatus = (status: number) => {
  if (status === 0) return theme.palette.grey[200];
  if (status === 1 || status === 2) return theme.palette.success.main;
  if (status === 3) return theme.palette.error.main;
};
