import { IServiceList, IBuyService, IServiceBuyList } from 'src/types/service';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toastMessage } from 'src/utils/toast';
import { serviceApi } from 'src/clients/http/service_api';

export const getService = createAsyncThunk<IServiceList, void>(
  'service/getService',
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
export const buyService = createAsyncThunk<any, IBuyService>(
  'service/buyService',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await serviceApi.buyService(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);

export const getServiceByCompany = createAsyncThunk<IServiceBuyList, string>(
  'service/getServiceByCompany',
  async (id_company, { rejectWithValue }) => {
    try {
      const { data } = await serviceApi.getServiceByCompany(id_company);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const activatedService = createAsyncThunk<
  any,
  {
    id_company: string;
    id_history: string;
  }
>(
  'service/activatedService',
  async ({ id_company, id_history }, { rejectWithValue }) => {
    try {
      const { data } = await serviceApi.activatedService(
        id_company,
        id_history
      );
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
