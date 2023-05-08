import { createAsyncThunk } from '@reduxjs/toolkit';
import { jobApi } from 'src/clients/http/job_api';
import { IJob, IJobDetails, IJobList, IPayloadJob } from 'src/types/job';
import { toastMessage } from 'src/utils/toast';

export const getJobList = createAsyncThunk<IJobList, void>(
  'job/getJobList',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await jobApi.getJobList();
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const getJobListFilters = createAsyncThunk<IJobList, any>(
  'job/getJobListFilters',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await jobApi.getJobListFilters(params);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const getJobById = createAsyncThunk<IJobDetails, string>(
  'job/getJobById',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await jobApi.getJobById(id);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const getJobByIdCompany = createAsyncThunk<{ job: IPayloadJob }, string>(
  'job/getJobByIdCompany',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await jobApi.getJobByIdCompany(id);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
export const createJob = createAsyncThunk<
  { job: IPayloadJob },
  {
    id_company: string;
    payload: IPayloadJob;
  }
>('job/createJob', async ({ id_company, payload }, { rejectWithValue }) => {
  try {
    const { data } = await jobApi.createJob(id_company, payload);
    return data;
  } catch (error: any) {
    toastMessage.setErrors(error);
    return rejectWithValue(error);
  }
});

export const getListJobByCompany = createAsyncThunk<IJobList, string>(
  'job/getListJobByCompany',
  async (id_company, { rejectWithValue }) => {
    try {
      const { data } = await jobApi.getListJobByCompany(id_company);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteJob = createAsyncThunk<
  any,
  {
    id_job: string;
    id_company: string;
    is_lock: 0 | 1;
  }
>('job/deleteJob', async ({ id_company, id_job, is_lock }, { rejectWithValue }) => {
  try {
    const { data } = await jobApi.deleteJob(id_company, id_job, is_lock);
    return data;
  } catch (error: any) {
    toastMessage.setErrors(error);
    return rejectWithValue(error);
  }
});
export const updateJob = createAsyncThunk<
  IJob,
  {
    id_job: string;
    payload: IPayloadJob;
  }
>('job/updateJob', async ({ id_job, payload }, { rejectWithValue }) => {
  try {
    const { data } = await jobApi.updateJob(id_job, payload);
    return data;
  } catch (error: any) {
    toastMessage.setErrors(error);
    return rejectWithValue(error);
  }
});
