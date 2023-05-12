import { createSlice } from '@reduxjs/toolkit';
import { getLocal, token } from 'src/constants/localstoge';
import { IJob } from 'src/types/job';
import {
  IPayLoadCV,
  ISavedList,
  IFollowList,
  INotification,
} from 'src/types/user';
import {
  loginUser,
  loginAdmin,
  getMeUser,
  saveJob,
  updateProfile,
  getSavedListByUser,
  createCV,
  getProfileCV,
  getAllFollowUser,
  unFollowCompany,
  getNotification,
  updateNotification,
  deleteNotification,
  getSuggetJobForYou,
} from './user_action';

interface IUserSlice {
  saveJobList: ISavedList;
  followList: IFollowList;
  profileCV: IPayLoadCV[];
  profile_detail?: IPayLoadCV;
  jobSuggets: {
    job_suggets_for_you: IJob[];
  };
  notification: {
    notificationList: INotification[];
    total_notification: number;
  };
  me: any;
  token: any;
}

const initialState: IUserSlice = {
  me: getLocal('user_account'),
  profileCV: [],
  token,
  profile_detail: {
    career_goals: '',
    desired_salary: 1000000,
    id_company_field: '',
    id_experience: '',
    id_type_current: '',
    id_type_desired: '',
    id_working_form: '',
    id_city: '',
    is_public: 0,
  },
  saveJobList: {
    savedList: [],
    total: 0,
  },
  jobSuggets: {
    job_suggets_for_you: [],
  },
  followList: {
    followers: [],
    total_follow: 0,
  },
  notification: {
    notificationList: [],
    total_notification: 0,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.me = action.payload;
      state.token = '';
      state = initialState;
      localStorage.removeItem('user_account');
      localStorage.removeItem('token');
    },

    unSaveJobById: (state, action) => {
      const id_job = action.payload;
      const newSavedList = state.saveJobList.savedList.filter(
        (item) => item.id_job !== id_job
      );
      state.saveJobList.savedList = newSavedList;
    },

    changeNotification: (state, action) => {
      state.notification.notificationList.unshift(action.payload);
      state.notification.total_notification =
        state.notification.total_notification + 1;
    },

    resetState: (state) => {
      localStorage.removeItem('user_account');
      localStorage.removeItem('token');
      state = initialState;
    },
    setProfileDetail: (state, action) => {
      state.profile_detail = action.payload;
    },
    resetProfileDetails: (state) => {
      state.profile_detail = initialState.profile_detail;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const {
        users,
        profile_cv,
        jobSuggets,
        saveJobList,
        accessToken,
        followList,
        notification,
      } = action.payload;
      state.me = users;
      state.token = accessToken;
      state.followList = followList;
      state.profileCV = profile_cv;
      state.saveJobList = saveJobList;
      state.jobSuggets = jobSuggets;
      state.notification = notification;
      localStorage.setItem('user_account', JSON.stringify(users));
      localStorage.setItem('token', accessToken);
    });
    builder
      .addCase(getMeUser.fulfilled, (state, action) => {
        const {
          users,
          profile_cv,
          jobSuggets,
          saveJobList,
          accessToken,
          followList,
          notification,
        } = action.payload;
        state.me = users;
        state.token = accessToken;
        state.followList = followList;
        state.profileCV = profile_cv;
        state.saveJobList = saveJobList;
        state.jobSuggets = jobSuggets;
        state.notification = notification;
        localStorage.setItem('user_account', JSON.stringify(users));
        localStorage.setItem('token', accessToken);
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        const { users, accessToken } = action.payload;
        state.me = users;
        state.token = accessToken;
        localStorage.setItem('user_account', JSON.stringify(users));
        localStorage.setItem('token', accessToken);
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const { users } = action.payload;
        state.me = users;
        localStorage.setItem('user_account', JSON.stringify(users));
      })
      .addCase(saveJob.fulfilled, (state, action) => {
        state.saveJobList = action.payload;
      })
      .addCase(getSavedListByUser.fulfilled, (state, action) => {
        state.saveJobList = action.payload;
      })
      .addCase(createCV.fulfilled, (state, action) => {
        console.log(action.payload.profile_cv);
        if (!Array.isArray(state.profileCV)) {
          state.profileCV = []; // Initialize as an empty array
        }

        state.profileCV.push(action.payload.profile_cv);
      })
      .addCase(getProfileCV.fulfilled, (state, action) => {
        // state.profileCV = action.payload.profile_cv;
      })
      .addCase(getAllFollowUser.fulfilled, (state, action) => {
        state.followList = action.payload;
      })
      .addCase(unFollowCompany.fulfilled, (state, action) => {
        state.followList = action.payload;
      })
      .addCase(getNotification.fulfilled, (state, action) => {
        state.notification = action.payload;
      })
      .addCase(getSuggetJobForYou.fulfilled, (state, action) => {
        state.jobSuggets = action.payload;
      })
      .addCase(updateNotification.fulfilled, (state, action) => {
        const index = state.notification.notificationList.findIndex(
          (item) => item.id_notification === action.payload
        );

        const newNotification = {
          ...state.notification.notificationList[index],
          status: 1,
        };
        state.notification.notificationList[index] = newNotification;
        state.notification.total_notification =
          state.notification.total_notification - 1;
      })
      .addCase(deleteNotification.fulfilled, (state, action) => {
        const newNotificationList = state.notification.notificationList.filter(
          (item) => item.id_notification !== action.payload
        );

        state.notification.notificationList = newNotificationList;
      });
  },
});

const { actions, reducer } = userSlice;
export const {
  logout,
  unSaveJobById,
  changeNotification,
  resetState,
  setProfileDetail,
  resetProfileDetails,
} = actions;
export default reducer;
