import { IPayloadLogin, IPayloadRegister } from 'src/types/auth';
import { IPayloadProfile } from 'src/types/profile';
import { IPayloadSaveJob, ISavedList } from 'src/types/user';
import { createClient } from './axios_client';

const client = createClient();

export const userApi = {
  login: (payload: IPayloadLogin) => {
    return client.post('/auth/login', payload);
  },
  register: (payload: IPayloadRegister) => {
    return client.post<any>('/auth/register', payload);
  },
  updateProfile: (payload: IPayloadProfile) => {
    return client.put<any>('/auth/update-profile', payload);
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
};
