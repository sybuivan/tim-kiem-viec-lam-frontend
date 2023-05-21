import { IRole } from './common';
import { ICompany } from './company';

export interface IUser {
  id_user: string;
  fullName: string;
  email: string;
  address: string;
  avatar: string;
  logo?: string;
  name_role: '';
  id_role: IRole;
  is_lock: number;
  city?: string;
  city_company?: string;
}

export interface IUsersList {
  users: IUser[];
  total: number;
}

export interface ILockUser {
  id_user: string;
  is_lock: number;
}

export interface ICompanyList {
  company_list: ICompany[];
  total: number;
}
