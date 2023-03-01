import { createSlice } from '@reduxjs/toolkit';
import { IJobList, IJob } from 'src/types/job';
import { getJobList, getJobById } from './job_action';

interface ICompanySlice {
  jobList: IJobList;
  jobDetail: IJob;
}

const initialState: ICompanySlice = {
  jobList: {
    data: [],
    total: 0,
  },
  jobDetail: {
    deadline: '',
    id_job: '',
    name_job: '',
    name_range: '',
    work_location: '',
  },
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getJobList.fulfilled, (state, action) => {
        state.jobList = action.payload;
      })
      .addCase(getJobById.fulfilled, (state, action) => {
        state.jobDetail = action.payload.job;
      });
  },
});

const { actions, reducer } = jobSlice;
export default reducer;
