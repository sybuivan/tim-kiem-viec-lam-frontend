import { createSlice } from '@reduxjs/toolkit';
import { getLocal, token } from 'src/constants/localstoge';
import { IPayLoadCV, ISavedList, IFollowList } from 'src/types/user';
import {
  loginUser,
  saveJob,
  updateProfile,
  getSavedListByUser,
  createCV,
  getProfileCV,
  getAllFollowUser,
  followCompany,
  unFollowCompany,
} from './user_action';

interface IUserSlice {
  saveJobList: ISavedList;
  followList: IFollowList;
  profileCV: IPayLoadCV;

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
      });
  },
});

const { actions, reducer } = userSlice;
export const { logout, unSaveJobById } = actions;
export default reducer;
