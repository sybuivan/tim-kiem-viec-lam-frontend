import { createSlice } from '@reduxjs/toolkit';
import { IServiceList } from 'src/types/service';
import { getService } from './service_action';

interface IServiceSlice {
  serviceList: IServiceList;
}

const initialState: IServiceSlice = {
  serviceList: { services: [] },
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getService.fulfilled, (state, action) => {
      state.serviceList = action.payload;
    });
  },
});

const { actions, reducer } = serviceSlice;
export default reducer;
