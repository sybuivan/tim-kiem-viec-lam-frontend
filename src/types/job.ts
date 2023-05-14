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
  deadline: Date;
  created_at: Date;
  name_experience?: string;
  name_rank?: string;
  name_field?: string;
  size_number?: number;
  description_job?: string;
  required_job?: string;
  benefits_job?: string;
  name_city?: string;
  is_lock?: 0 | 1;
  days_left?: number;
}

export interface IPayloadJob {
  name_job: string;
  work_location: string;
  city: string;
  size_number: number;
  description_job?: string;
  required_job?: string;
  benefits_job?: string;
  id_field: string;
  id_history?: string;
  id_type: string;
  id_range: string;
  id_experience: string;
  id_working_form: string;
  deadline: string | Date;
  created_at?: string | Date | null;
}

export interface IJobDetails {
  job: IJob;
  job_suggets: IJob[];
}

export interface IJobTop {
  id_rank: string;
  name_rank: string;
  total_count: number;
}
