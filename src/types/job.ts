import { ICompany } from './company';

// export interface IJob extends ICompany {
//   nameJob: string;
//   nameRange: string;
// }

export interface IJobList {
  data: IJob[];
  total: number;
}

export interface IJob extends ICompany {
  id_job: string;
  name_range: string;
  name_job: string;
  work_location: string;
  deadline: Date | string;
  created_at?: Date | string;
  name_experience?: string;
  name_rank?: string;
  name_field?: string;
  total_number?: number;
  description_job?: string;
  required_job?: string;
  benefits_job?: string;
}
