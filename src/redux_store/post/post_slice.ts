import { createSlice } from '@reduxjs/toolkit';
import { IPostList } from 'src/types/post';
import { getAllPosts } from './post_actions';

interface IPostSlice {
  postList: IPostList;
}

const initialState: IPostSlice = {
  postList: {
    post_list: [],
    total: 0,
  },
};

const postSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetData: (state) => {
      state.postList = initialState.postList;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.postList = action.payload;
    });
  },
});

const { actions, reducer } = postSlice;
export const { resetData } = actions;
export default reducer;
