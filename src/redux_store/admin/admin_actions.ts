import { createAsyncThunk } from '@reduxjs/toolkit';
import { adminApi } from 'src/clients/http/admin_api';
import { IUsersList, ILockUser, ICompanyList } from 'src/types/admin';
import { ICompany } from 'src/types/company';
import { toastMessage } from 'src/utils/toast';

export const getAllUsers = createAsyncThunk<IUsersList, string>(
  'admin/getAllUsers',
  async (id_role, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.getAllUsers(id_role);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const updateUser = createAsyncThunk<string, ILockUser>(
  'admin/updateUser',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.updateUser(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);

export const getCompanyRegister = createAsyncThunk<ICompanyList, void>(
  'admin/getCompanyRegister',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.getCompanyRegister();
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const getUserCompanyById = createAsyncThunk<ICompany, string>(
  'admin/getUserCompanyById',
  async (id_company, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.getUserCompanyById(id_company);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const updateActiveCompany = createAsyncThunk<
  string,
  { id_user: string; active_status: number }
>('admin/updateActiveCompany', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await adminApi.updateActiveCompany(payload);
    return data;
  } catch (error: any) {
    toastMessage.setErrors(error);
    return rejectWithValue(error);
  }
});
export const statistical = createAsyncThunk<any, void>(
  'admin/statistical',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await adminApi.statistical();
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const settingCommon = createAsyncThunk<
  any,
  { type: string; id: string; name: string }
>('admin/settingCommon', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await adminApi.settingCommon(payload);
    return data;
  } catch (error: any) {
    toastMessage.setErrors(error);
    return rejectWithValue(error);
  }
});
