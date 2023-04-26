import { createSlice } from '@reduxjs/toolkit';
import { IUsersList } from 'src/types/admin';
import { getAllUsers, updateUser } from './admin_actions';

interface IAdminSlice {
  usersList: IUsersList;
}

const initialState: IAdminSlice = {
  usersList: { users: [], total: 0 },
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetData: (state) => {
      state.usersList = initialState.usersList;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.usersList = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const index = state.usersList.users.findIndex(
        (item) => item.id_user === action.payload
      );
      state.usersList.users[index].is_lock =
        state.usersList.users[index].is_lock === 0 ? 1 : 0;
    });
  },
});

const { actions, reducer } = adminSlice;
export const { resetData } = actions;
export default reducer;
