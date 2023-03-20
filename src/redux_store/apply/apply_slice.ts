import { createSlice } from '@reduxjs/toolkit';
import { IApplyList } from 'src/types/apply';
import { applyJob, getApplyList } from './apply_actions';

interface IApplySlice {
  applyList: IApplyList;
}

const initialState: IApplySlice = {
  applyList: { data: [], total: 0 },
};

const applySlice = createSlice({
  name: 'apply',
  initialState,
  reducers: {
    resetApplyData: (state) => {
      state.applyList = initialState.applyList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(applyJob.fulfilled, (state, action) => {
        state.applyList.data.push(action.payload.apply_cv);
      })
      .addCase(getApplyList.fulfilled, (state, action) => {
        state.applyList = action.payload;
      });
  },
});

const { actions, reducer } = applySlice;
export const { resetApplyData } = actions;
export default reducer;
