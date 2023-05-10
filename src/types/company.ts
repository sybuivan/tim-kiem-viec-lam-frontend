import { IJob } from './job';

export interface ICompany {
  nameCompany?: string;
  location?: string;
  id_company?: string;
  name_company?: string;
  logo?: string;
  totalJob?: number;
  address?: string;
  total_people?: number;
  introduce?: string;
  link_website?: string;
  lat?: number;
  lng?: number;
  cover_image?: string;
  active_status?: string;
  phone?: string;
  fullName?: string;
  email?: string;
  name_field?: string;
}

export interface IPayloadRegisterCompany {
  email: string;
  password?: string;
  fullName: string;
  phone: number;
  name_company: string;
  faxCode?: string;
  total_people: string;
  city: string;
  address: string;
  fieldOfActivity?: string;
}

export interface IPayloadCompanyInfo extends IPayloadRegisterCompany {
  lat?: number;
  lng?: number;
  link_website?: string;
  introduce: string;
  idCompanyField?: string;
}

export interface ICompanyList {
  companyList: ICompany[];
  total?: number;
}

export interface ICompanyDetail {
  company: ICompany;
  jobs: IJob[];
  total: number;
  followere: {
    id_user: string;
  }[];
}

export interface IParamsCandidate {
  keyword: string;
  id_company_field: string;
  id_city: string;
}

export interface ICandidate {
  id_user: string;
  fullName: string;
  phone: string;
  email: string;
  name_field: string;
  file_cv: string;
  avatar: string;
}

export interface ICandidateDetail extends ICandidate {
  gender: string;
  birthDay: string;
  address: string;
  city: string;
  id_type_current: string;
  id_type_desired: string;
  id_city: string;
  desired_salary: number;
  file_name: string;
  career_goals: string;
  id_company_field: string;
  id_experience: string;
  id_working_form: string;
}
