import { IApply, IApplyList } from 'src/types/apply';
import { IJob, IJobList } from 'src/types/job';
import { createClient } from './axios_client';

import { baseURL } from 'src/config';
const client = createClient(baseURL);

export const applyApi = {
  applyJob: (formData: FormData) => {
    return client.post<{ apply_cv: IApply }>(`/apply/apply-job`, formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
  },
  getApplyList: (id_user: string) => {
    return client.get<IApplyList>(`/apply/get-apply-list/${id_user}`);
  },
};
