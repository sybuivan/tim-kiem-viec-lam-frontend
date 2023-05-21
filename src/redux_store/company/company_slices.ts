import { createSlice } from '@reduxjs/toolkit';
import {
  ICompanyDetail,
  ICompanyList,
  ICandidate,
  ICandidateDetail,
} from 'src/types/company';
import {
  getCompanyList,
  getCompanyById,
  loginCompany,
  updateProfile,
  getCandidateList,
  getAllFolllowUser,
  unfollowUser,
  followUser,
  getAllJobByIdCompany,
  getProfileAppliedByJob,
  getCandidateDetail,
} from './company_action';
import { IApplyUser } from 'src/types/apply';

interface ICompanySlice {
  companyList: ICompanyList;
  companyDetail: ICompanyDetail;
  profileModal: {
    user_info: ICandidate;
    profileCV: ICandidateDetail[];
  };
  followList: {
    followers: ICandidate[];
    total: number;
  };
  candidateList: {
    data: ICandidate[];
    total: number;
  };
  filtersCandidate: {
    id_city: string;
    id_company_field: string;
    keyword: string;
  };
  jobList: {
    jobs: {
      name_job: string;
      id_job: string;
      deadline: string;
    }[];
  };
  appliedJob: {
    applied: IApplyUser[];
    total: number;
  };
  timeMail: {
    id_apply: string;
    email: string;
    id_user: string;
    status: number | string | any;
    name_job: string;
    fullName: string;
    date?: any;
    hour?: any;
    messageMailer: string;
  }[];
}

const initialState: ICompanySlice = {
  companyList: {
    companyList: [],
    total: 0,
  },
  profileModal: {
    user_info: {
      avatar: '',
      email: '',
      file_cv: '',
      fullName: '',
      id_user: '',
      name_field: '',
      phone: '',
      address: '',
      birthDay: '',
      city: '',
      gender: '',
    },
    profileCV: [],
  },
  filtersCandidate: {
    id_city: '',
    id_company_field: '',
    keyword: '',
  },
  candidateList: {
    data: [],
    total: 0,
  },
  followList: {
    followers: [],
    total: 0,
  },

  companyDetail: {
    company: {},
    jobs: [],
    total: 0,
    followere: [],
  },
  jobList: {
    jobs: [],
  },

  appliedJob: {
    applied: [],
    total: 0,
  },
  timeMail: [],
};

const companySlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addFollowere: (state, action) => {
      state.companyDetail.followere.push(action.payload);
    },
    changeFiltersCandidate: (state, action) => {
      console.log(action.payload);
      state.filtersCandidate = action.payload;
    },
    updateFollowere: (state, action) => {
      const newFollowere = state.companyDetail.followere.filter(
        (item) => item.id_user !== action.payload
      );
      state.companyDetail.followere = newFollowere;
    },
    logoutCompany: (state, action) => {
      localStorage.removeItem('user_account');
      localStorage.removeItem('token');
    },

    updateStatusApllied: (
      state,
      action: { payload: { id_apply: string; status: number } }
    ) => {
      const index = state.appliedJob.applied.findIndex(
        (item) => item.id_apply === action.payload.id_apply
      );
      const newApply = {
        ...state.appliedJob.applied[index],
        status: action.payload.status,
      };

      state.appliedJob.applied[index] = newApply;
    },

    setPayloadMail: (state, action) => {
      state.timeMail = action.payload;
    },
    changePayloadMail: (state, action) => {
      const { index, date, hour, messageMailer } = action.payload;

      console.log({ paylaod: action.payload });
      const newPayload = {
        ...state.timeMail[index],
        date,
        hour,
        messageMailer,
      };
      state.timeMail[index] = newPayload;
    },

    resetMail: (state) => {
      state.timeMail = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCompanyList.fulfilled, (state, action) => {
      state.companyList = action.payload;
    });
    builder.addCase(getCompanyById.fulfilled, (state, action) => {
      state.companyDetail = action.payload;
    });
    builder
      .addCase(loginCompany.fulfilled, (state, action) => {
        const { users, accessToken } = action.payload;
        localStorage.setItem('user_account', JSON.stringify(users));
        localStorage.setItem('token', accessToken);
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const { company } = action.payload;
        localStorage.setItem('user_account', JSON.stringify(company));
      })
      .addCase(getAllFolllowUser.fulfilled, (state, action) => {
        state.followList = action.payload;
      })
      .addCase(getCandidateList.fulfilled, (state, action) => {
        state.candidateList = action.payload;
      })
      .addCase(unfollowUser.fulfilled, (state, action) => {
        const newFollowList = state.followList.followers.filter(
          (item) => item.id_user !== action.payload
        );
        state.followList.followers = newFollowList;
      })
      .addCase(followUser.fulfilled, (state, action) => {
        state.followList = action.payload;
      })
      .addCase(getAllJobByIdCompany.fulfilled, (state, action) => {
        state.jobList = action.payload;
      })
      .addCase(getCandidateDetail.fulfilled, (state, action) => {
        state.profileModal = action.payload;
      })
      .addCase(getProfileAppliedByJob.fulfilled, (state, action) => {
        const newAppliedJob = action.payload.applied.map((apply) => {
          return {
            ...apply,
            checked: false,
          };
        });
        state.appliedJob.applied = newAppliedJob;
        state.appliedJob.total = action.payload.total;
      });
  },
});

const { actions, reducer } = companySlice;
export const {
  addFollowere,
  updateFollowere,
  logoutCompany,
  changeFiltersCandidate,
  updateStatusApllied,
  setPayloadMail,
  changePayloadMail,
  resetMail,
} = actions;
export default reducer;
