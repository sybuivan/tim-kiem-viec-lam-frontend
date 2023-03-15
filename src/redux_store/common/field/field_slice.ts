import { createSlice } from '@reduxjs/toolkit';
import { IApplyList } from 'src/types/apply';
import { IFieldList } from 'src/types/common';
import { getAllField } from './field_actions';

interface ICommonSlice {
  fieldList: IFieldList;
}

const initialState: ICommonSlice = {
  fieldList: {
    companyfield: [],
    experiencefield: [],
    rangewagefield: [],
    typerankfield: [],
    workingformfield: [],
    cityfield: [],
  },
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllField.fulfilled, (state, action) => {
      state.fieldList = action.payload;
    });
  },
});

const { actions, reducer } = commonSlice;
export default reducer;
