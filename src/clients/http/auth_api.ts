import { IPayloadLogin, IPayloadRegister } from 'src/types/auth';
import { mainURL } from 'src/config';
import { createClient } from './axios_client';
const client = createClient(mainURL);

export const authApi = {
  login: (payload: IPayloadLogin) => {
    return client.post('/auth/login', payload);
  },
  loginAdmin: (payload: IPayloadLogin) => {
    return client.post('/auth/admin/login', payload);
  },
  register: (payload: IPayloadRegister) => {
    return client.post<any>('/auth/register', payload);
  },
  refreshToken: ({ refreshToken }: { refreshToken: string }) => {
    return client.post('/auth/refresh-token', { refreshToken });
  },
};
