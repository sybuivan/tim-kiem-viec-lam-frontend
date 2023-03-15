import { IApplyList, IApply } from 'src/types/apply';
import { IJob } from 'src/types/job';

export const messageRequired = (key: string) => {
  return `${key} không được bỏ trống`;
};

export const checkIsSaveJob = (savedList: IJob[], id_job: string) => {
  return savedList.findIndex((job) => job.id_job === id_job) >= 0
    ? true
    : false;
};

export const checkIsApply = (applyList: IApply[], id_job: string) => {
  return applyList.findIndex((apply) => apply.id_job === id_job) >= 0
    ? true
    : false;
};

export const checkIsFollow = (
  followere: { id_user: string }[],
  id_user: string
) => {
  return followere.findIndex((item) => item.id_user === id_user) >= 0
    ? true
    : false;
};
