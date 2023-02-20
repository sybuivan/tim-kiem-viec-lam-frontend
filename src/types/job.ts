import { ICompany } from './company';

export interface IJob extends ICompany {
  nameJob: string;
  nameRange: string;
}

export interface IJobList {
  data: IJob[];
  total: number;
}
