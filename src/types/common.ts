import { ReactNode } from 'react';

export type TMuiSize = 'small' | 'medium' | 'large';

export type TMuiColor =
  | 'warning'
  | 'default'
  | 'error'
  | 'info'
  | 'primary'
  | 'secondary'
  | 'success'
  | undefined;

export interface IModal {
  modalId: string;
  modalComponent?: ReactNode;
}

export interface IModalState {
  [modalId: string]: {
    open: boolean;
    modalComponent: ReactNode;
  };
}

export interface ITabItem {
  key: string;
  label: string;
  component: ReactNode;
  typeTab?: string;
}

export interface IPagination<T> {
  totalData: number;
  data: T[];
}
export interface IErrorsDetail {
  [x: string]: { id: string; message: string }[];
}

export interface IErrors {
  id: string;
  message: string;
  statusCode: number;
  errors: IErrorsDetail;
  detail?: string;
}

export interface IFilterOption {
  id: string;
  name: string;
}

export interface IExperience {
  id_experience: string;
  name_experience: string;
}
export interface ICompanyField {
  id_companyField: string;
  name_field: string;
}
export interface IRangewage {
  id_range: string;
  name_range: string;
}
export interface ITypeRank {
  id_rank: string;
  name_rank: string;
}
export interface IWorkingForm {
  id_working_form: string;
  name_working_form: string;
}
export interface ICity {
  id_city: string;
  name_city: string;
}

export interface IFieldList {
  companyfield: ICompanyField[];
  experiencefield: IExperience[];
  rangewagefield: IRangewage[];
  typerankfield: ITypeRank[];
  workingformfield: IWorkingForm[];
  cityfield: ICity[];
}

export interface IHomeFilter {
  keyword: string;
  city: string;
  companyfield: string;
}

export interface IadvancedFilter extends IHomeFilter {
  id_experience?: string;
  id_range?: string;
  id_rank?: string;
  id_working_form?: string;
  page: number;
  created?: string;
}

export type IRole = 'user' | 'admin' | 'company';
export interface IDiscover {
  title: string;
  icon: any;
  count: number;
  id?: number;
}
