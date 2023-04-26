import { IUsersList, ILockUser } from 'src/types/admin';
import { createClient } from './axios_client';

const client = createClient();

export const adminApi = {
  getAllUsers: (id_role: string) => {
    return client.get<IUsersList>(`/admin/get-all-users/${id_role}`);
  },
  updateUser: (payload: ILockUser) => {
    return client.put<string>(`/admin/lock-user`, payload);
  },
};
