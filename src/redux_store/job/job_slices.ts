import { createSlice } from '@reduxjs/toolkit';
import { IadvancedFilter, IHomeFilter } from 'src/types/common';
import { IJobList, IJob } from 'src/types/job';
import { getJobList, getJobById, getJobListFilters } from './job_action';

interface ICompanySlice {
  jobList: IJobList;
  jobDetail: IJob;
  jobFilters: IadvancedFilter;
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
  jobFilters: {
    keyword: '',
    city: '',
    companyfield: '',
    page: 1,
  },
};

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    changeHomeFilter: (state, action) => {
      state.jobFilters = action.payload;
    },
    resetFilter: (state) => {
      const newFields = {
        ...initialState.jobFilters,
        id_experience: '',
        id_range: '',
        id_rank: '',
        id_working_form: '',
        id_gender: '',
      };
      state.jobFilters = newFields;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobList.fulfilled, (state, action) => {
        state.jobList = action.payload;
      })
      .addCase(getJobListFilters.fulfilled, (state, action) => {
        state.jobList = action.payload;
      })
      .addCase(getJobById.fulfilled, (state, action) => {
        state.jobDetail = action.payload.job;
      });
  },
});

const { actions, reducer } = jobSlice;
export const { changeHomeFilter, resetFilter } = actions;
export default reducer;
