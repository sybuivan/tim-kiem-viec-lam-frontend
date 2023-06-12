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

import { COptionStatusApply } from 'src/constants/common';

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
  const name = applied.filter((item) => item.id_job === id_job);

  return name[0].name_job;
};

export const getSubTimeFromDayFNS = (date?: any) => {
  const now = moment();
  const locale = vi;
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
  if (status === 1) return 'Đã xem hồ sơ';
  if (status === 2) return 'Đã liên hệ';
  if (status === 3) return 'Đã test';
  if (status === 4) return 'Từ chối';
};

export const renderColorStatus = (status: number) => {
  if (status === 0) return theme.palette.grey[200];
  if (status === 1) return theme.palette.success.main;
  if (status === 2) return theme.palette.warning.main;
  if (status === 3) return theme.palette.secondary.main;
  if (status === 4) return theme.palette.error.main;
};

export const renderColorText = (status: number) => {
  if (status === 0 || status === 1) return theme.palette.common.white;

  return theme.palette.common.white;
};

export const renderColors = (numColors: number) => {
  var colors = [];
  var usedColors = new Set(); // Tạo một Set để lưu trữ các mã màu đã sử dụng

  while (colors.length < numColors) {
    var color = '#' + Math.floor(Math.random() * 16777215).toString(16);

    if (!usedColors.has(color)) {
      colors.push(color);
      usedColors.add(color);
    }
  }

  return colors;
};

export const renderOptionsStatus = (status: number) => {
  const options = [...COptionStatusApply];
  const index = options.findIndex((item) => item.status === status);
  if (index !== -1) {
    options.splice(0, index);
  }
  return options;
};

export const renderdata = ({
  labels,
  colors,
  data,
  title,
  label,
}: {
  labels: string[];
  colors: string[];
  data: number[];
  title: string;
  label: string;
}) => {
  return {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
      },
    ],

    title: {
      display: true,
      text: title,
    },
  };
};

export const optionsDoughnut = (title: string) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
};
