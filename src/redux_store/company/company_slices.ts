import { createSlice } from '@reduxjs/toolkit';
import { ICompanyDetail, ICompanyList } from 'src/types/company';
import {
  getCompanyList,
  getCompanyById,
  loginCompany,
  updateProfile,
} from './company_action';
import { getLocal, token } from 'src/constants/localstoge';

interface ICompanySlice {
  companyList: ICompanyList;
  companyDetail: ICompanyDetail;
  me: any;
  token: string;
}

const initialState: ICompanySlice = {
  companyList: {
    companyList: [],
    total: 0,
  },
  companyDetail: {
    company: {},
    jobs: [],
    total: 0,
    followere: [],
  },
  me: getLocal,
  token,
};

const companySlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addFollowere: (state, action) => {
      state.companyDetail.followere.push(action.payload);
    },
    updateFollowere: (state, action) => {
      const newFollowere = state.companyDetail.followere.filter(
        (item) => item.id_user !== action.payload
      );
      state.companyDetail.followere = newFollowere;
    },
    logoutCompany: (state, action) => {
      state.me = action.payload;
      state.token = '';
      localStorage.removeItem('user_account');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCompanyList.fulfilled, (state, action) => {
      state.companyList = action.payload;
    });
    builder.addCase(getCompanyById.fulfilled, (state, action) => {
      state.companyDetail = action.payload;
    });
    builder
      .addCase(loginCompany.fulfilled, (state, action) => {
        const { users, accessToken } = action.payload;
        state.me = users;
        state.token = accessToken;
        localStorage.setItem('user_account', JSON.stringify(users));
        localStorage.setItem('token', accessToken);
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        const { company } = action.payload;
        state.me = company;
        localStorage.setItem('user_account', JSON.stringify(company));
      });
  },
});

const { actions, reducer } = companySlice;
export const { addFollowere, updateFollowere, logoutCompany } = actions;
export default reducer;
