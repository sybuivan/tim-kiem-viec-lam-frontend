import { createSlice } from '@reduxjs/toolkit';
import { IPayLoadCV, ISavedList } from 'src/types/user';
import {
  loginUser,
  saveJob,
  updateProfile,
  getSavedListByUser,
  createCV,
  getProfileCV,
} from './user_action';

const getLocal: any = localStorage.getItem('user_account')
  ? JSON.parse(localStorage.getItem('user_account') || '')
  : null;

const token: any = localStorage.getItem('token');

interface IUserSlice {
  saveJobList: ISavedList;
  profileCV: IPayLoadCV;
  me: any;
  token: any;
}

const initialState: IUserSlice = {
  me: getLocal,
  profileCV: {
    career_goals: '',
    desired_salary: 0,
    id_company_field: '',
    id_experience: '',
    id_type_current: '',
    id_type_desired: '',
    id_working_form: '',
    is_public: 0,
  },
  token,
  saveJobList: {
    savedList: [],
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
      });
  },
});

const { actions, reducer } = userSlice;
export const { logout, unSaveJobById } = actions;
export default reducer;
