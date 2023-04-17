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
  size_number?: number;
  description_job?: string;
  required_job?: string;
  benefits_job?: string;
  name_city?: string;
}

export interface IPayloadJob {
  name_job: string;
  work_location: string;
  city: string;
  size_number: number;
  description_job: string;
  required_job: string;
  benefits_job: string;
  id_field: string;
  id_type: string;
  id_range: string;
  id_experience: string;
  id_working_form: string;
  deadline: string | Date;
  created_at?: string | Date | null;
  urgent_recruitment?: number;
}

export interface IJobDetails {
  job: IJob;
  job_suggets: IJob[];
}
