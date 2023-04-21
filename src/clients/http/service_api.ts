import { IServiceList, IBuyService, IServiceBuyList } from 'src/types/service';
import { createClient } from './axios_client';

const client = createClient();

export const serviceApi = {
  getService: () => {
    return client.get<IServiceList>('/service/get-service');
  },
  getServiceByCompany: (id_company: string) => {
    return client.get<IServiceBuyList>(
      `/service/get-service-by-company/${id_company}`
    );
  },
  buyService: (payload: IBuyService) => {
    return client.post<any>('/service/buy-service', payload);
  },
};