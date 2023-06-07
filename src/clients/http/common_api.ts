import { IFieldList } from 'src/types/common';
import { createClient } from './axios_client';

import { mainURL } from 'src/config';
const client = createClient(mainURL);

export const commonApi = {
  getAllField: () => {
    return client.get<IFieldList>('/common/get-all-field');
  },
};
