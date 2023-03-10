import { createAsyncThunk } from '@reduxjs/toolkit';
import { jobApi } from 'src/clients/http/job_api';
import { IJob, IJobList } from 'src/types/job';
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
