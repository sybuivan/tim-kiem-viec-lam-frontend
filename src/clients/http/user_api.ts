import { IPayloadGetMe, IPayloadLogin, IPayloadRegister } from 'src/types/auth';
import { IPayloadProfile } from 'src/types/profile';
import {
  IPayLoadCV,
  IPayloadFollow,
  IPayloadSaveJob,
  IProfileCV,
  ISavedList,
} from 'src/types/user';
import { createClient } from './axios_client';

import { mainURL } from 'src/config';
const client = createClient(mainURL);

export const userApi = {
  login: (payload: IPayloadLogin) => {
    return client.post('/auth/login', payload);
  },
  loginAdmin: (payload: IPayloadLogin) => {
    return client.post('/auth/admin/login', payload);
  },
  register: (payload: IPayloadRegister) => {
    return client.post<any>('/auth/register', payload);
  },
  refreshToken: () => {
    return client.post('/auth/refresh-token');
  },
  getMe: (payload: IPayloadGetMe) => {
    return client.post('/user/get-me', payload);
  },
  updateProfile: (formData: any) => {
    return client.put<any>('/user/update-profile', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
  },
  updateIsPublicCV: (formData: {
    id_profile: string;
    is_public: boolean;
    id_user: string;
  }) => {
    return client.put<{ id_profile: string; is_public: boolean }>(
      '/user/update-is-public',
      formData
    );
  },
  createCV: (formData: any) => {
    return client.post<IProfileCV>('/user/create-profile-cv', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
  },
  updateCV: (formData: any) => {
    return client.put<IProfileCV>('/user/update-profile-cv', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
  },
  getProfileCV: (id_user: string) => {
    return client.get<{ profile_cv: IPayLoadCV[] }>(`/user/get-profile-cv`);
  },

  getProfileCVById: (id_profile: string) => {
    return client.get<IPayLoadCV>(`/user/get-cv-by-id/${id_profile}`);
  },

  saveJob: (payload: IPayloadSaveJob) => {
    return client.post<ISavedList>('/user/save-job', payload);
  },
  getSavedListByUser: (id_user: string) => {
    return client.get<ISavedList>(`/user/get-all-saved-user/${id_user}`);
  },
  unSavedJob: (payload: IPayloadSaveJob) => {
    return client.delete(`/user/un-save-job`, {
      data: payload,
    });
  },

  followCompany: (payload: IPayloadFollow) => {
    return client.post('/user/add-follow', payload);
  },
  unFollowCompany: (payload: IPayloadFollow) => {
    return client.delete('/user/unfollow', {
      data: payload,
    });
  },

  getAllFollowUser: (id_user: string) => {
    return client.get(`/user/get-all-follow-users`);
  },
  getNotification: (id_user: string) => {
    return client.get(`/user/get-notification`);
  },
  updateNotification: (id_notification: string) => {
    return client.put(`/user/update-notification/${id_notification}`);
  },
  deleteNotification: (id_notification: string) => {
    return client.delete(`/user/delete-notification/${id_notification}`);
  },
  getSuggetJobForYou: () => {
    return client.get(`/user/get-suggets-job-for-you`);
  },
};
