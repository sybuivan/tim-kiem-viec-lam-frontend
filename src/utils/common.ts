import { ROLE_COMPANY, ROLE_USER } from 'src/constants/common';
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

export const checkRoleCompany = (idRole: string, token: string) => {
  if (idRole === ROLE_COMPANY && token) return true;

  return false;
};
export const checkRoleUser = (idRole: string, token: string) => {
  if (idRole === ROLE_USER && token) return true;

  return false;
};
