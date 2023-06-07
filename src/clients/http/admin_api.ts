import { mainURL } from 'src/config';
import { IUsersList, ILockUser, ICompanyList } from 'src/types/admin';
import { ICompany } from 'src/types/company';
import { createClient } from './axios_client';

const client = createClient(mainURL);

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
  getUserCompanyById: (id_company: string) => {
    return client.get<ICompany>(`/admin/get-company-by-id/${id_company}`);
  },
  statistical: () => {
    return client.get('/admin/statistical');
  },
  updateActiveCompany: (payload: {
    id_user: string;
    active_status: number;
  }) => {
    return client.put<string>('/admin/update-active-status-company', payload);
  },
  settingCommon: (payload: { type: string; id: string; name: string }) => {
    return client.post<string>('/admin/setting/common', payload);
  },
};
