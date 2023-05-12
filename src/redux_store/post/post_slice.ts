import { createSlice } from '@reduxjs/toolkit';
import { IPostList, IPost } from 'src/types/post';
import { getAllPosts, getPostDetail } from './post_actions';

interface IPostSlice {
  postList: IPostList;
  postDetail: IPost;
}

const initialState: IPostSlice = {
  postList: {
    post_list: [],
    total: 0,
  },
  postDetail: { content: '', description: '', title: '' },
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
    builder.addCase(getPostDetail.fulfilled, (state, action) => {
      state.postDetail = action.payload;
    });
  },
});

const { actions, reducer } = postSlice;
export const { resetData } = actions;
export default reducer;
