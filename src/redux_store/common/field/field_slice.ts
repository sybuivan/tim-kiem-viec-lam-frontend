import { createSlice } from '@reduxjs/toolkit';
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
  reducers: {
    setCommonField: (state, action) => {
      const { type, data } = action.payload;
      switch (type) {
        case 'companyfield': {
          state.fieldList.companyfield.push(data);
          break;
        }
        case 'rangewage': {
          state.fieldList.rangewagefield.push(data);
          break;
        }
        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllField.fulfilled, (state, action) => {
      state.fieldList = action.payload;
    });
  },
});

const { actions, reducer } = commonSlice;
export const { setCommonField } = actions;
export default reducer;
