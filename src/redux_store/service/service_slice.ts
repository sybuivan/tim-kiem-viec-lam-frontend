import { createSlice } from '@reduxjs/toolkit';
import { IServiceList, IServiceBuyList } from 'src/types/service';
import {
  getService,
  getServiceByCompany,
  activatedService,
} from './service_action';

interface IServiceSlice {
  serviceList: IServiceList;
  serviceBuyList: IServiceBuyList;
}

const initialState: IServiceSlice = {
  serviceList: { services: [] },
  serviceBuyList: {
    services: [],
    total: 0,
  },
};

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    resetData: (state) => {
      state.serviceList = initialState.serviceList;
      state.serviceBuyList = initialState.serviceBuyList;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getService.fulfilled, (state, action) => {
      state.serviceList = action.payload;
    });
    builder.addCase(getServiceByCompany.fulfilled, (state, action) => {
      state.serviceBuyList = action.payload;
    });
    builder.addCase(activatedService.fulfilled, (state, action) => {
      const index = state.serviceBuyList.services.findIndex(
        (item) => item.id_history === action.payload
      );

      state.serviceBuyList.services[index].activated = 1;
    });
  },
});

const { actions, reducer } = serviceSlice;
export const { resetData } = actions;

export default reducer;
