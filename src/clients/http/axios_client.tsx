import axios, { AxiosError } from 'axios';

export const getClientToken = (config: any) => {};

export const setClientToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const createClient = (baseURL: string, access?: string) => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      return Promise.reject(error.response?.data);
    }
  );

  instance.interceptors.request.use(
    (config: any) => {
      console.log('localStorage.getItem()', localStorage.getItem('token'));
      const token = localStorage.getItem('token')
        ? localStorage.getItem('token') || ''
        : null;

      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  return instance;
};
