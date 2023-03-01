import { createSlice } from '@reduxjs/toolkit';
import { ISavedList } from 'src/types/user';
import {
  loginUser,
  saveJob,
  updateProfile,
  getSavedListByUser,
} from './user_action';

const getLocal: any = localStorage.getItem('user_account')
  ? JSON.parse(localStorage.getItem('user_account') || '')
  : null;

const token: any = localStorage.getItem('token');

interface IUserSlice {
  saveJobList: ISavedList;
  me: any;
  token: any;
}

const initialState: IUserSlice = {
  me: getLocal,
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
      });
  },
});

const { actions, reducer } = userSlice;
export const { logout, unSaveJobById } = actions;
export default reducer;
