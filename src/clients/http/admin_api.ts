import { baseURL } from 'src/config';
import { IUsersList, ILockUser, ICompanyList } from 'src/types/admin';
import { createClient } from './axios_client';

const client = createClient(baseURL);

export const adminApi = {
  getAllUsers: (id_role: string) => {
    return client.get<IUsersList>(`/admin/get-all-users/${id_role}`);
  },
  updateUser: (payload: ILockUser) => {
    return client.put<string>(`/admin/lock-user`, payload);
  },

  getCompanyRegister: () => {
    return client.get<ICompanyList>('/admin/get-list-company-register');
  },
  updateActiveCompany: (payload: {
    id_user: string;
    active_status: number;
  }) => {
    return client.put<string>('/admin/update-active-status-company', payload);
  },
};
