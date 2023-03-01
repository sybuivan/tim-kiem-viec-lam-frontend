import { IJob } from './job';

export interface IPayloadSaveJob {
  id_user: string;
  id_job: string;
}

export interface ISavedList {
  savedList: IJob[];
  total: number;
}
