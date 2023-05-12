import { IFieldList } from 'src/types/common';
import { createClient } from './axios_client';

import { baseURL } from 'src/config';
const client = createClient(baseURL);

export const commonApi = {
  getAllField: () => {
    return client.get<IFieldList>('/common/get-all-field');
  },
};
