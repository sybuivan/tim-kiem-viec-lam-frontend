import { createSlice } from '@reduxjs/toolkit';
import { IadvancedFilter } from 'src/types/common';
import { IJobDetails, IJobList } from 'src/types/job';
import {
  getJobById,
  getJobList,
  getJobListFilters,
  getListJobByCompany,
} from './job_action';

interface ICompanySlice {
  jobList: IJobList;
  jobDetail: IJobDetails;
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
    job: {
      deadline: '',
      id_job: '',
      name_job: '',
      name_range: '',
      work_location: '',
    },
    job_suggets: [],
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
      const index = state.jobListCompany.data.findIndex(
        (job) => job.id_job === action.payload
      );
      state.jobListCompany.data[index].is_lock =
        state.jobListCompany.data[index].is_lock === 0 ? 1 : 0;
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
        state.jobDetail = action.payload;
      });
  },
});

const { actions, reducer } = jobSlice;
export const { changeHomeFilter, resetFilter, deleteJobById } = actions;
export default reducer;
