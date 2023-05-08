import { IJob, IJobDetails, IJobList, IPayloadJob } from 'src/types/job';
import { createClient } from './axios_client';
import queryString from 'query-string';

const client = createClient();

export const jobApi = {
  getJobList: () => {
    return client.get<IJobList>(`/job/get-list-job`);
  },
  getJobListFilters: (stringParams?: any) => {
    return client.get<IJobList>(
      `/job/get-list-job-filters?${queryString.stringify(stringParams)}`
    );
  },

  getJobById: (id_job: string) => {
    return client.get<IJobDetails>(`/job/get-job-by-id/${id_job}`);
  },
  getJobByIdCompany: (id_job: string) => {
    return client.get<{ job: IPayloadJob }>(
      `/job/get-job-by-id-company/${id_job}`
    );
  },

  getListJobByCompany: (id_company: string) => {
    return client.get<IJobList>(`/job/get-jobs-by-company/${id_company}`);
  },
  createJob: (id_company: string, data: IPayloadJob) => {
    return client.post<{ job: IPayloadJob }>(
      `/job/create-job/${id_company}`,
      data
    );
  },
  deleteJob: (id_company: string, id_job: string, is_lock: 0 | 1) => {
    return client.delete<any>(
      `/job/delete-job?id_job=${id_job}&id_company=${id_company}&is_lock=${is_lock}`
    );
  },
  updateJob: (id_job: string, data: IPayloadJob) => {
    return client.put<IJob>(`/job/update-job/${id_job}`, data);
  },
};
