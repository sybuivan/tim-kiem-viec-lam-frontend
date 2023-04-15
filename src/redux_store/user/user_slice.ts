import { createSlice } from '@reduxjs/toolkit';
import { getLocal, token } from 'src/constants/localstoge';
import {
  IPayLoadCV,
  ISavedList,
  IFollowList,
  INotification,
} from 'src/types/user';
import {
  loginUser,
  saveJob,
  updateProfile,
  getSavedListByUser,
  createCV,
  getProfileCV,
  getAllFollowUser,
  unFollowCompany,
  getNotification,
  updateNotification,
} from './user_action';

interface IUserSlice {
  saveJobList: ISavedList;
  followList: IFollowList;
  profileCV: IPayLoadCV;
  notification: {
    notificationList: INotification[];
    total: number;
  };
  me: any;
  token: any;
}

const initialState: IUserSlice = {
  me: getLocal,
  profileCV: {
    career_goals: '',
    desired_salary: 1000000,
    id_company_field: '',
    id_experience: '',
    id_type_current: '',
    id_type_desired: '',
    id_working_form: '',
    city: '',
    is_public: 0,
  },
  token,
  saveJobList: {
    savedList: [],
    total: 0,
  },
  followList: {
    followers: [],
    total: 0,
  },
  notification: {
    notificationList: [],
    total: 0,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state, action) => {
      state.me = action.payload;
      state.token = '';
      state.saveJobList = initialState.saveJobList;
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
      state.notification.total = state.notification.total + 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
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
        state.profileCV = action.payload.profile_cv;
      })
      .addCase(getProfileCV.fulfilled, (state, action) => {
        state.profileCV = action.payload.profile_cv;
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
      .addCase(updateNotification.fulfilled, (state, action) => {
        const index = state.notification.notificationList.findIndex(
          (item) => item.id_notification === action.payload
        );

        const newNotification = {
          ...state.notification.notificationList[index],
          status: 1,
        };
        state.notification.notificationList[index] = newNotification;
        state.notification.total = state.notification.total - 1;
      });
  },
});

const { actions, reducer } = userSlice;
export const { logout, unSaveJobById, changeNotification } = actions;
export default reducer;
