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
    timeout: 100000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        // Handle specific HTTP error codes, e.g., unauthorized (401)
        if (error.response.status === 401) {
          // Redirect to login page using React Router
          return Promise.reject(error.response.data);
        }
        // Handle other error codes or display a generic error message
        else {
          toastMessage.error('Something went wrong');
          return Promise.reject(error.response.data);
        }
      } else {
        // Handle network errors or other unexpected errors
        return Promise.reject(error);
      }
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
        // toastMessage.error(error.message || 'Lỗi hệ thống!');
      } else {
        return Promise.reject(error);
      }
    }
  );

  return instance;
};
