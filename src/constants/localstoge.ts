export const getLocal = (key: string) => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key) || '')
    : null;
};
export const token: any = localStorage.getItem('token');
