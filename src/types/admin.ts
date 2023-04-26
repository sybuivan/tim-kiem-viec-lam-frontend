import { IRole } from './common';

export interface IUser {
  id_user: string;
  fullName: string;
  email: string;
  address: string;
  avatar: string;
  logo?: string;
  name_role: IRole;
  is_lock: number;
}

export interface IUsersList {
  users: IUser[];
  total: number;
}

export interface ILockUser {
  id_user: string;
  is_lock: number;
}
