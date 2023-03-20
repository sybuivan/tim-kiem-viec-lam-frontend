import { createAsyncThunk } from '@reduxjs/toolkit';
import { jobApi } from 'src/clients/http/job_api';
import { IJob, IJobList, IPayloadJob } from 'src/types/job';
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
export const getJobById = createAsyncThunk<{ job: IJob }, string>(
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
