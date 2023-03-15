import { createAsyncThunk } from '@reduxjs/toolkit';
import { applyApi } from 'src/clients/http/apply_api';
import { IApplyList } from 'src/types/apply';
import { toastMessage } from 'src/utils/toast';

export const applyJob = createAsyncThunk<any, any>(
  'apply/applyJob',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await applyApi.applyJob(formData);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);

export const getApplyList = createAsyncThunk<IApplyList, string>(
  'apply/getApplyList',
  async (id_user, { rejectWithValue }) => {
    try {
      const { data } = await applyApi.getApplyList(id_user);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
