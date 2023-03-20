import { IPayloadLogin, IPayloadRegister } from 'src/types/auth';
import {
  ICompanyDetail,
  ICompanyList,
  IPayloadCompanyInfo,
  IPayloadRegisterCompany,
} from 'src/types/company';
import { IPayloadProfile } from 'src/types/profile';
import { createClient } from './axios_client';

const client = createClient();

export const companyApi = {
  login: (payload: IPayloadLogin) => {
    return client.post('/company/login', payload);
  },
  register: (payload: IPayloadRegisterCompany) => {
    return client.post<any>('/company/register', payload);
  },
  updateProfile: (id_company: string, payload: FormData) => {
    console.log({ id_company });
    return client.put<any>(`/company/update-profile/${id_company}`, payload, {
      headers: { 'content-type': 'multipart/form-data' },
    });
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
