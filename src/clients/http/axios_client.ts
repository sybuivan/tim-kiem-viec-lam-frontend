import axios, { AxiosError } from 'axios';
import { Navigate } from 'react-router';
import { toastMessage } from 'src/utils/toast';

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
      const token = localStorage.getItem('token')
        ? localStorage.getItem('token') || ''
        : null;
      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }
      return config;
    },
    (error) => {
      if (axios.isCancel(error)) {
        toastMessage.error(error.message || 'Lỗi hệ thống!');
      } else {
        return Promise.reject(error);
      }
    }
  );

  return instance;
};
