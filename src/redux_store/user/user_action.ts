import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from 'src/clients/http/user_api';
import { IPayloadLogin, IPayloadRegister } from 'src/types/auth';
import { IPayloadProfile } from 'src/types/profile';
import {
  IPayLoadCV,
  IPayloadFollow,
  IPayloadSaveJob,
  IProfileCV,
  ISavedList,
} from 'src/types/user';
import { toastMessage } from 'src/utils/toast';

export const loginUser = createAsyncThunk<
  {
    users: any;
    accessToken: string;
  },
  IPayloadLogin
>('user/loginUser', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await userApi.login(payload);
    return data;
  } catch (error: any) {
    toastMessage.setErrors(error);
    return rejectWithValue(error);
  }
});

export const registerUser = createAsyncThunk<any, IPayloadRegister>(
  'user/registerUser',
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

export const updateProfile = createAsyncThunk<
  {
    users: any;
  },
  any
>('user/updateProfile', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await userApi.updateProfile(payload);
    return data;
  } catch (error: any) {
    toastMessage.setErrors(error);
    return rejectWithValue(error);
  }
});

export const createCV = createAsyncThunk<IProfileCV, any>(
  'user/createCV',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.createCV(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);

export const getProfileCV = createAsyncThunk<IProfileCV, string>(
  'user/getProfileCV',
  async (id_user, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getProfileCV(id_user);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const saveJob = createAsyncThunk<ISavedList, IPayloadSaveJob>(
  'user/saveJob',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.saveJob(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const getSavedListByUser = createAsyncThunk<ISavedList, string>(
  'user/getSavedListByUser',
  async (id_user, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getSavedListByUser(id_user);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);

export const unSavedJob = createAsyncThunk<any, IPayloadSaveJob>(
  'user/unSavedJob',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.unSavedJob(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const followCompany = createAsyncThunk<any, IPayloadFollow>(
  'user/followCompany',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.followCompany(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const unFollowCompany = createAsyncThunk<any, IPayloadFollow>(
  'user/unFollowCompany',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await userApi.unFollowCompany(payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const getAllFollowUser = createAsyncThunk<any, string>(
  'user/getAllFollowUser',
  async (id_user, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getAllFollowUser(id_user);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const getNotification = createAsyncThunk<any, string>(
  'user/getNotification',
  async (id_user, { rejectWithValue }) => {
    try {
      const { data } = await userApi.getNotification(id_user);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const updateNotification = createAsyncThunk<any, string>(
  'user/updateNotification',
  async (id_notification, { rejectWithValue }) => {
    try {
      const { data } = await userApi.updateNotification(id_notification);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
