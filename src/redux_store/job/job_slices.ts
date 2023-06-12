import { createSlice } from '@reduxjs/toolkit';
import { IadvancedFilter } from 'src/types/common';
import { IJobDetails, IJobList, IJobTop } from 'src/types/job';
import {
  getJobById,
  getJobList,
  getJobListFilters,
  getListJobByCompany,
  getTopJob,
  getJobNews,
} from './job_action';

interface ICompanySlice {
  jobList: IJobList;
  jobDetail: IJobDetails;
  jobFilters: IadvancedFilter;
  jobNews: IJobList;
  jobListCompany: IJobList;
  jobTop: { data: IJobTop[] };
}

const initialState: ICompanySlice = {
  jobList: {
    data: [],
    total: 0,
  },
  jobNews: {
    data: [],
    total: 0,
  },
  jobListCompany: { data: [], total: 0 },
  jobDetail: {
    job: {
      deadline: new Date(),
      created_at: new Date(),
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
    created: 'DESC',
  },
  jobTop: { data: [] },
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
      .addCase(getTopJob.fulfilled, (state, action) => {
        state.jobTop = action.payload;
      })
      .addCase(getJobById.fulfilled, (state, action) => {
        state.jobDetail = action.payload;
      })
      .addCase(getJobNews.fulfilled, (state, action) => {
        const { data, total } = action.payload;
        state.jobNews.data = data.map((item) => {
          return {
            ...item,
            is_new: true,
          };
        });

        state.jobNews.total = total;
      });
  },
});

const { actions, reducer } = jobSlice;
export const { changeHomeFilter, resetFilter, deleteJobById } = actions;
export default reducer;
