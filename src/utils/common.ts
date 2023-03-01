import { IJob } from 'src/types/job';

export const messageRequired = (key: string) => {
  return `${key} không được bỏ trống`;
};

export const checkIsSaveJob = (savedList: IJob[], id_job: string) => {
  return savedList.findIndex((job) => job.id_job === id_job) >= 0
    ? true
    : false;
};
