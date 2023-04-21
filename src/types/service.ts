export interface IService {
  id_service: string;
  name_service: string;
  price: number;
  number_of_months: number;
  description: string;
  total_news: number;
}

export interface IServiceList {
  services: IService[];
}

export interface IBuyService {
  id_company: string;
  id_history: string;
  id_service: string;
}

export interface IServiceDetail {
  id_history: string;
  id_service: string;
  id_company: string;
  created_at: string;
  expiry: string;
  activated: number;
  name_service: string;
  number_of_months: 1;
  total_news: number;
  description?: string;
  price?: number;
}

export interface IServiceBuyList {
  services:IServiceDetail[];
  total: number
}