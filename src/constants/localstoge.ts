export const REFRESH_TOKEN_ETC = 'REFRESH_TOKEN_ETC';
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const USER_ACCOUNT = 'USER_ACCOUNT';

export const getLocalStorage = (key: string) => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) || '')
    : null;
};

export const setLocalStorage = ({
  key,
  value,
}: {
  key: string;
  value: any;
}) => {
  localStorage.setItem(key, value);
};

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
export const getToken: any = localStorage.getItem(ACCESS_TOKEN);
export const getRefreshToken: any = localStorage.getItem(REFRESH_TOKEN_ETC);
