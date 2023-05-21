import { IJob } from './job';

export interface IPayloadSaveJob {
  id_user: string;
  id_job: string;
}

export interface ISavedList {
  savedList: IJob[];
  total: number;
}

export interface IFollowCompany {
  name_company: string;
  id_company: string;
  created_at: string;
  address: string;
  total_people: number;
  logo: string;
  total: number;
}
export interface IFollowList {
  followers: IFollowCompany[];
  total_follow: number;
}

export interface IPayLoadCV {
  id_user?: string;
  id_profile?: string;
  id_type_current: string;
  id_type_desired: string;
  career_goals: string;
  desired_salary: any;
  id_experience: string;
  is_public: any;
  id_working_form: string;
  id_company_field: string;
  file_cv?: any;
  file_name?: any;
  created_at?: Date | string;
  id_city: string;
}

export interface IProfileCV {
  profile_cv: IPayLoadCV;
}

export interface IPayloadFollow {
  id_user: string;
  id_company: string;
}

export interface INotification {
  id_notification: string;
  status: number;
  content: string;
  created_at: string | Date;
}
