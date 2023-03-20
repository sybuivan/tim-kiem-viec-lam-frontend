export const getLocal: any = localStorage.getItem('user_account')
  ? JSON.parse(localStorage.getItem('user_account') || '')
  : null;

export const token: any = localStorage.getItem('token');
