import { createSlice } from '@reduxjs/toolkit';
import { getLocal, token } from 'src/constants/localstoge';
import { IJob } from 'src/types/job';

interface IUserSlice {
  me: any;
  token: any;
}

const initialState: IUserSlice = {
  me: getLocal('user_account'),
  token,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginInfo: (state, action) => {
      const { users, accessToken } = action.payload;
      state.me = users;
      state.token = accessToken;
      localStorage.setItem('user_account', JSON.stringify(users));
      localStorage.setItem('token', accessToken);
    },
    resetState: (state) => {
      localStorage.removeItem('user_account');
      localStorage.removeItem('token');
      state = initialState;
    },
  },
});

const { actions, reducer } = authSlice;
export const { setLoginInfo, resetState } = actions;
export default reducer;
