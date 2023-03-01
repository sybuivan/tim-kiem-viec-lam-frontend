import { IJob, IJobList } from 'src/types/job';
import { createClient } from './axios_client';

const client = createClient();

export const jobApi = {
  getJobList: () => {
    return client.get<IJobList>(`/job/get-list-job`);
  },

  getJobById: (id_job: string) => {
    return client.get<{ job: IJob }>(`/job/get-job-by-id/${id_job}`);
  },
};
