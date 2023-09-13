import { createSlice } from '@reduxjs/toolkit';
import {
  USER_ACCOUNT,
  ACCESS_TOKEN,
  getLocalStorage,
  getToken,
  setLocalStorage,
  removeLocalStorage,
} from 'src/constants/localstoge';
import { IJob } from 'src/types/job';

interface IUserSlice {
  me: any;
  token: any;
}

const initialState: IUserSlice = {
  me: getLocalStorage(USER_ACCOUNT),
  token: getToken,
};

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoginInfo: (state, action) => {
      const { users, accessToken } = action.payload;
      state.me = users;
      state.token = accessToken;
      setLocalStorage({ key: USER_ACCOUNT, value: JSON.stringify(users) });
      setLocalStorage({ key: ACCESS_TOKEN, value: accessToken });
    },
    resetState: (state) => {
      removeLocalStorage(USER_ACCOUNT);
      removeLocalStorage(ACCESS_TOKEN);
      state.me = '';
      state.token = '';
    },

    updateProfileUser: (state, action) => {
      state.me = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;
export const { setLoginInfo, resetState, updateProfileUser } = actions;
export default reducer;
