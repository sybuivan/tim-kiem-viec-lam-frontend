import { IFieldList } from 'src/types/common';
import { createClient } from './axios_client';

const client = createClient();

export const commonApi = {
  getAllField: () => {
    return client.get<IFieldList>('/common/get-all-field');
  },
};
