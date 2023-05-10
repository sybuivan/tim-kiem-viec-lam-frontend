import axios, { AxiosError } from 'axios';

export const getClientToken = (config: any) => {};

export const setClientToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const createClient = () => {
  const baseURL = 'http://localhost:5000/api/v1';

  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
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

      console.log({ token });
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};
