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
