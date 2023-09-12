import { createSlice } from '@reduxjs/toolkit';
import { IJob } from 'src/types/job';
import {
  IFollowList,
  INotification,
  IPayLoadCV,
  ISavedList,
} from 'src/types/user';
import {
  createCV,
  deleteNotification,
  getAllFollowUser,
  getMeUser,
  getNotification,
  getProfileCV,
  getProfileCVById,
  getSavedListByUser,
  getSuggetJobForYou,
  loginAdmin,
  loginUser,
  saveJob,
  unFollowCompany,
  updateIsPublicCV,
  updateNotification,
  updateProfile,
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
}

const initialState: IUserSlice = {
  profileCV: [],
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

    resetStateUser: (state) => {
      localStorage.removeItem('user_account');
      localStorage.removeItem('token');
      state.followList = initialState.followList;
      state.jobSuggets = initialState.jobSuggets;
      state.notification = initialState.notification;
      state.saveJobList = initialState.saveJobList;
      state.profile_detail = initialState.profile_detail;
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
        state.followList = followList;
        state.profileCV = profile_cv;
        state.saveJobList = saveJobList;
        state.jobSuggets = jobSuggets;
        state.notification = notification;
        localStorage.setItem('user_account', JSON.stringify(users));
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        const { users, accessToken } = action.payload;
        localStorage.setItem('user_account', JSON.stringify(users));
        localStorage.setItem('token', accessToken);
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const { users } = action.payload;
        localStorage.setItem('user_account', JSON.stringify(users));
      })
      .addCase(saveJob.fulfilled, (state, action) => {
        state.saveJobList = action.payload;
      })
      .addCase(getSavedListByUser.fulfilled, (state, action) => {
        state.saveJobList = action.payload;
      })
      .addCase(createCV.fulfilled, (state, action) => {
        if (!Array.isArray(state.profileCV)) {
          state.profileCV = []; // Initialize as an empty array
        }
        state.profileCV.push(action.payload.profile_cv);
      })
      .addCase(getProfileCV.fulfilled, (state, action) => {
        state.profileCV = action.payload.profile_cv;
      })
      .addCase(getProfileCVById.fulfilled, (state, action) => {
        state.profile_detail = action.payload;
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
        state.notification.total_notification =
          state.notification.total_notification - 1;
      })
      .addCase(updateIsPublicCV.fulfilled, (state, action) => {
        const { id_profile, is_public } = action.payload;
        const index = state.profileCV.findIndex(
          (item) => item.id_profile === id_profile
        );

        if (index !== -1) {
          const newPayload = {
            ...state.profileCV[index],
            is_public,
          };
          state.profileCV[index] = newPayload;
        }
      });
  },
});

const { actions, reducer } = userSlice;
export const {
  logout,
  unSaveJobById,
  changeNotification,
  resetStateUser,
  resetProfileDetails,
} = actions;
export default reducer;
