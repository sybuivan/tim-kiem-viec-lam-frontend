import { createSlice } from '@reduxjs/toolkit';
import { IUsersList, ICompanyList } from 'src/types/admin';
import {
  getAllUsers,
  updateUser,
  getCompanyRegister,
  updateActiveCompany,
  statistical,
} from './admin_actions';

interface IAdminSlice {
  usersList: IUsersList;
  companyList: ICompanyList;
  statistical: {
    total_revenue: number;
    jobs_by_industry: {
      name_field: string;
      job_count: number;
    }[];
    users_by_industry: {
      name_role: string;
      user_count: number;
    }[];
    city_by_industry: {
      name_city: string;
      city_count: number;
    }[];
    total_data_month: {
      month: string;
      total_revenue: number;
    }[];
  };
}

const initialState: IAdminSlice = {
  usersList: { users: [], total: 0 },
  companyList: {
    company_list: [],
    total: 0,
  },
  statistical: {
    jobs_by_industry: [],
    users_by_industry: [],
    city_by_industry: [],
    total_revenue: 0,
    total_data_month: [],
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
    builder.addCase(statistical.fulfilled, (state, action) => {
      state.statistical = action.payload;
    });
  },
});

const { actions, reducer } = adminSlice;
export const { resetData } = actions;
export default reducer;
