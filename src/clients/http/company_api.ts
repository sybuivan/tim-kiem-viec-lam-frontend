import { IPayloadLogin, IPayloadRegister } from 'src/types/auth';
import {
  ICandidate,
  ICandidateDetail,
  ICompanyDetail,
  ICompanyList,
  IParamsCandidate,
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

  getCandidateDetail: (id_user: string) => {
    return client.get<{ user_info: ICandidateDetail }>(
      `/company/get-candidate-detail/${id_user}`
    );
  },

  getAllFolllowUser: (id_company: string) => {
    return client.get<any>(`/company/get-candidate-follow/${id_company}`);
  },

  followUser: (payload: { id_user: string; id_company: string }) => {
    return client.post(`/company/follow-user`, payload);
  },
  unfollowUser: (payload: { id_user: string; id_company: string }) => {
    return client.delete<string>(`/company/unfollow-user`, {
      data: payload,
    });
  },

  getCandidateList: (params: IParamsCandidate) => {
    return client.get<{
      data: ICandidate[];
      total: number;
    }>(`/company/get-candidate-list`, {
      params,
    });
  },
  getAllJobByIdCompany: (id_company: string) => {
    return client.get(`/company/get-all-job-by-company/${id_company}`);
  },
  getProfileAppliedByJob: (params: { id_company: string; id_job?: string }) => {
    return client.get(`/company/get-applied-by-company`, { params });
  },
  updateStatusApplied: (payload: { id_apply: string; status: number }[]) => {
    return client.post(`/company/update-status-applied`, payload);
  },
};
