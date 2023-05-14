import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from 'src/clients/http/user_api';
import {
  IInfoUser,
  IPayloadLogin,
  IPayloadRegister,
  IPayloadGetMe,
} from 'src/types/auth';
import {
  IPayloadFollow,
  IPayloadSaveJob,
  IProfileCV,
  ISavedList,
} from 'src/types/user';
import { toastMessage } from 'src/utils/toast';

export const loginUser = createAsyncThunk<IInfoUser, IPayloadLogin>(
  'user/loginUser',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.login(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
