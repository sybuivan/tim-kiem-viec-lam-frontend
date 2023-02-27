import { createSlice } from '@reduxjs/toolkit';
import { loginUser, updateProfile } from './user_action';

const getLocal: any = localStorage.getItem('user_account')
  ? JSON.parse(localStorage.getItem('user_account') || '')
  : null;

const token: any = localStorage.getItem('token');

const initialState = {
  me: getLocal,
  token,
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
      });
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
