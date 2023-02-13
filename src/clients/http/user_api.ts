import { createClient } from './axios_client';

const client = createClient();

export const userApi = {
  login: () => {
    return client.post('/users');
  },
  register: () => {
    return client.post('/users');
  },
};
