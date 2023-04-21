import { IServiceList } from 'src/types/service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastMessage } from 'src/utils/toast';
import { serviceApi } from 'src/clients/http/service_api';

export const getService = createAsyncThunk<IServiceList, void>(
  'job/getService',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await serviceApi.getService();
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
