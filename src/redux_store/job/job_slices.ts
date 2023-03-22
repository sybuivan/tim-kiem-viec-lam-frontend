import { createSlice } from '@reduxjs/toolkit';
import { IadvancedFilter } from 'src/types/common';
import { IJobList, IJob } from 'src/types/job';
import {
  getJobList,
  getJobById,
  getJobListFilters,
  getListJobByCompany,
} from './job_action';

interface ICompanySlice {
  jobList: IJobList;
  jobDetail: IJob;
  jobFilters: IadvancedFilter;
  jobListCompany: IJobList;
}

const initialState: ICompanySlice = {
  jobList: {
    data: [],
    total: 0,
  },
  jobListCompany: { data: [], total: 0 },
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

    deleteJobById: (state, action) => {
      const newJobList = state.jobListCompany.data.filter(
        (job) => job.id_job !== action.payload
      );
      state.jobListCompany.data = newJobList;
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
      .addCase(getListJobByCompany.fulfilled, (state, action) => {
        state.jobListCompany = action.payload;
      })
      .addCase(getJobById.fulfilled, (state, action) => {
        state.jobDetail = action.payload.job;
      });
  },
});

const { actions, reducer } = jobSlice;
export const { changeHomeFilter, resetFilter, deleteJobById } = actions;
export default reducer;
