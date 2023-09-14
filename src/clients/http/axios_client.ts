import axios, { AxiosError } from 'axios';
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN_ETC,
  setLocalStorage,
} from 'src/constants/localstoge';
import { toastMessage } from 'src/utils/toast';

export const setClientToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

export const createClient = (baseURL: string) => {
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
          return refreshToken(error, () => {});
        }
        // Handle other error codes or display a generic error message
        else {
          // toastMessage.error('Something went wrong');
          return Promise.reject(error.response.data);
        }
      } else {
        // Handle network errors or other unexpected errors
        return Promise.reject(error);
      }
    }
  );

  const refreshToken = async (error: any, logout: Function) => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_ETC);
    if (!refreshToken) {
      return;
    }
    try {
      const { data } = await instance.post('/auth/refresh-token', {
        refreshToken,
      });

      setLocalStorage({
        key: REFRESH_TOKEN_ETC,
        value: data.refreshToken,
      });
      setLocalStorage({
        key: ACCESS_TOKEN,
        value: data.accessToken,
      });

      error.config.headers = {
        Authorization: 'Bearer ' + data.accessToken,
      };
      return axios(error.config);
    } catch (error) {
      logout();
      return;
    }
  };

  instance.interceptors.request.use(
    async (config: any) => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      if (accessToken) {
        config.headers['Authorization'] = 'Bearer ' + accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};
