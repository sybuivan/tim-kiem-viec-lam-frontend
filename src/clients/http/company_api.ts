import { IPayloadLogin, IPayloadRegister } from 'src/types/auth';
import { ICompanyDetail, ICompanyList } from 'src/types/company';
import { IPayloadProfile } from 'src/types/profile';
import { createClient } from './axios_client';

const client = createClient();

export const companyApi = {
  login: (payload: IPayloadLogin) => {
    return client.post('/company/login', payload);
  },
  register: (payload: IPayloadRegister) => {
    return client.post<any>('/company/register', payload);
  },
  updateProfile: (id_company: string, payload: IPayloadProfile) => {
    return client.put<any>(`/company/update-profile/${id_company}`, payload);
  },

  getCompanyById: (id_company: string) => {
    return client.get<ICompanyDetail>(
      `/company/get-company-by-id/${id_company}`
    );
  },

  getCompanyList: () => {
    return client.get<ICompanyList>(`/company/get-company-list`);
  },
};
