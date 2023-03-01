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
  },
};

const companySlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
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
export default reducer;
