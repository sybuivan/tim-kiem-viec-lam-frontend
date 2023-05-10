import { createSlice } from '@reduxjs/toolkit';
import { IUsersList, ICompanyList } from 'src/types/admin';
import {
  getAllUsers,
  updateUser,
  getCompanyRegister,
  updateActiveCompany,
} from './admin_actions';

interface IAdminSlice {
  usersList: IUsersList;
  companyList: ICompanyList;
}

const initialState: IAdminSlice = {
  usersList: { users: [], total: 0 },
  companyList: {
    company_list: [],
    total: 0,
  },
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
    builder.addCase(getCompanyRegister.fulfilled, (state, action) => {
      state.companyList = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const index = state.usersList.users.findIndex(
        (item) => item.id_user === action.payload
      );
      state.usersList.users[index].is_lock =
        state.usersList.users[index].is_lock === 0 ? 1 : 0;
    });
    builder.addCase(updateActiveCompany.fulfilled, (state, action) => {
      const newData = state.companyList.company_list.filter(
        (item) => item.id_company !== action.payload
      );
      state.companyList.company_list = newData;
    });
  },
});

const { actions, reducer } = adminSlice;
export const { resetData } = actions;
export default reducer;
