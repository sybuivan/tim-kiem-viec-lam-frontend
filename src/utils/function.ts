import moment from 'moment';

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
