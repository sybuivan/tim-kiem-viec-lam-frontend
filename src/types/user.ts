import { IJob } from './job';

export interface IPayloadSaveJob {
  id_user: string;
  id_job: string;
}

export interface ISavedList {
  savedList: IJob[];
  total: number;
}

export interface IPayLoadCV {
  id_user?: string;
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
}

export interface IProfileCV {
  profile_cv: IPayLoadCV;
}
