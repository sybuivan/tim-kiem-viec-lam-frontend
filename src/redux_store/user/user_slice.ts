import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  me: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      console.log('test');
    },
  },
});

const { actions, reducer } = userSlice;
export const {} = actions;
export default reducer;
