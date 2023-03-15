import { createSlice } from '@reduxjs/toolkit';
import { ICompanyDetail, ICompanyList } from 'src/types/company';
import { getCompanyList, getCompanyById } from './company_action';

interface ICompanySlice {
  companyList: ICompanyList;
  companyDetail: ICompanyDetail;
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
  },
  extraReducers: (builder) => {
    builder.addCase(getCompanyList.fulfilled, (state, action) => {
      state.companyList = action.payload;
    });
    builder.addCase(getCompanyById.fulfilled, (state, action) => {
      state.companyDetail = action.payload;
    });
  },
});

const { actions, reducer } = companySlice;
export const { addFollowere, updateFollowere } = actions;
export default reducer;
