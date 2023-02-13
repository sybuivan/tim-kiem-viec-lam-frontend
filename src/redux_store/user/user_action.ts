import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from 'src/clients/http/user_api';

export const loginUser = createAsyncThunk<string, void>(
  'user/loginUser',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await userApi.login();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
