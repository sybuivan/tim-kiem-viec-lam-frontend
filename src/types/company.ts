export interface ICompany {
  totalJob?: number;
  avatar: string;
  nameCompany?: string;
  location?: string;
}

export interface ICompanyList {
  data: ICompany[];
}
