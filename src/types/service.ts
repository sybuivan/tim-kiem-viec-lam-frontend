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
