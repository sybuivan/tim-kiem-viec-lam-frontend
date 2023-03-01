import { createAsyncThunk } from '@reduxjs/toolkit';
import { companyApi } from 'src/clients/http/company_api';
import { userApi } from 'src/clients/http/user_api';
import { IPayloadLogin, IPayloadRegister } from 'src/types/auth';
import { ICompanyList, ICompanyDetail } from 'src/types/company';
import { IPayloadProfile } from 'src/types/profile';
import { toastMessage } from 'src/utils/toast';

export const loginCompany = createAsyncThunk<
  {
    users: any;
    accessToken: string;
  },
  IPayloadLogin
>('company/loginCompany', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await userApi.login(payload);
    return data;
  } catch (error: any) {
    toastMessage.setErrors(error);
    return rejectWithValue(error);
  }
});

export const registerCompany = createAsyncThunk<any, IPayloadRegister>(
  'company/registerCompany',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.register(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);

export const getCompanyList = createAsyncThunk<ICompanyList, void>(
  'company/getCompanyList',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await companyApi.getCompanyList();
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const getCompanyById = createAsyncThunk<ICompanyDetail, string>(
  'company/getCompanyById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await companyApi.getCompanyById(id);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
