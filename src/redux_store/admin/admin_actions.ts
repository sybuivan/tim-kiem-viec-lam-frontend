import { createAsyncThunk } from '@reduxjs/toolkit';
import { adminApi } from 'src/clients/http/admin_api';
import { IUsersList, ILockUser } from 'src/types/admin';
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
