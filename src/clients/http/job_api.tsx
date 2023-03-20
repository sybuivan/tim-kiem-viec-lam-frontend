import { IJob, IJobList, IPayloadJob } from 'src/types/job';
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
    return client.get<{ job: IJob }>(`/job/get-job-by-id/${id_job}`);
  },

  createJob: (id_company: string, data: IPayloadJob) => {
    return client.post<{ job: IPayloadJob }>(
      `/job/create-job/${id_company}`,
      data
    );
  },
};
