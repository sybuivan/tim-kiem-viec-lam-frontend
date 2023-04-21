import { IServiceList } from 'src/types/service';
import { createClient } from './axios_client';

const client = createClient();

export const serviceApi = {
  getService: () => {
    return client.get<IServiceList>('/service/get-service');
  },
};
