import { createAsyncThunk } from '@reduxjs/toolkit';
import { commonApi } from 'src/clients/http/common_api';
import { toastMessage } from 'src/utils/toast';

export const getAllField = createAsyncThunk<any, void>(
  'common/getAllField',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await commonApi.getAllField();
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
