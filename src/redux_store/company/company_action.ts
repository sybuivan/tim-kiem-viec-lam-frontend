import { createAsyncThunk } from '@reduxjs/toolkit';
import { companyApi } from 'src/clients/http/company_api';
import { IApplyUser } from 'src/types/apply';
import { IPayloadLogin } from 'src/types/auth';
import {
  ICompanyList,
  ICompanyDetail,
  IPayloadRegisterCompany,
  IPayloadCompanyInfo,
  IParamsCandidate,
  ICandidate,ICandidateDetail
} from 'src/types/company';
import { toastMessage } from 'src/utils/toast';

export const loginCompany = createAsyncThunk<
  {
    users: any;
    accessToken: string;
  },
  IPayloadLogin
>('company/loginCompany', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await companyApi.login(payload);
    return data;
  } catch (error: any) {
    toastMessage.setErrors(error);
    return rejectWithValue(error);
  }
});

export const registerCompany = createAsyncThunk<any, IPayloadRegisterCompany>(
  'company/registerCompany',
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await companyApi.register(payload);
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
export const updateProfile = createAsyncThunk<
  { company: IPayloadCompanyInfo },
  {
    id_company: string;
    payload: FormData;
  }
>(
  'company/updateProfile',
  async ({ id_company, payload }, { rejectWithValue }) => {
    try {
      const { data } = await companyApi.updateProfile(id_company, payload);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const getAllFolllowUser = createAsyncThunk<any, string>(
  'company/getAllFolllowUser',
  async (id_company, { rejectWithValue }) => {
    try {
      const { data } = await companyApi.getAllFolllowUser(id_company);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const getCandidateList = createAsyncThunk<
  {
    data: ICandidate[];
    total: number;
  },
  IParamsCandidate
>('company/getCandidateList', async (params, { rejectWithValue }) => {
  try {
    const { data } = await companyApi.getCandidateList(params);
    return data;
  } catch (error: any) {
    toastMessage.setErrors(error);
    return rejectWithValue(error);
  }
});

export const getCandidateDetail = createAsyncThunk<{ user_info: ICandidateDetail }, string>(
  'company/getCandidateDetail',
  async (id_user, { rejectWithValue }) => {
    try {
      const { data } = await companyApi.getCandidateDetail(id_user);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);

export const followUser = createAsyncThunk<
  {
    followers: ICandidate[];
    total: number;
  },
  {
    id_user: string;
    id_company: string;
  }
>(
  'company/followUser',
  async ({ id_user, id_company }, { rejectWithValue }) => {
    try {
      const { data } = await companyApi.followUser({
        id_company,
        id_user,
      });
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const unfollowUser = createAsyncThunk<
  string,
  {
    id_user: string;
    id_company: string;
  }
>(
  'company/unfollowUser',
  async ({ id_user, id_company }, { rejectWithValue }) => {
    try {
      const { data } = await companyApi.unfollowUser({
        id_company,
        id_user,
      });
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);

export const getAllJobByIdCompany = createAsyncThunk<any, string>(
  'company/getAllJobByIdCompany',
  async (id_company, { rejectWithValue }) => {
    try {
      const { data } = await companyApi.getAllJobByIdCompany(id_company);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);

export const getProfileAppliedByJob = createAsyncThunk<
  {
    applied: IApplyUser[];
    total: number;
  },
  {
    id_company: string;
    id_job?: string;
  }
>(
  'company/getProfileAppliedByJob',
  async ({ id_company, id_job }, { rejectWithValue }) => {
    try {
      const { data } = await companyApi.getProfileAppliedByJob({
        id_company,
        id_job,
      });
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const updateStatusApplied = createAsyncThunk<
  any,
  {
    id_apply: string;
    status: number;
    id_user: string;
    name_job: string;
  }[]
>('company/updateStatusApplied', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await companyApi.updateStatusApplied(payload);
    return data;
  } catch (error: any) {
    toastMessage.setErrors(error);
    return rejectWithValue(error);
  }
});
