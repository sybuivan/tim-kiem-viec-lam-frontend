import { createAsyncThunk } from '@reduxjs/toolkit';
import { postApi } from 'src/clients/http/post_api';
import { IPostList } from 'src/types/post';
import { toastMessage } from 'src/utils/toast';

export const getAllPosts = createAsyncThunk<IPostList, void>(
  'post/getAllPosts',
  async (id_role, { rejectWithValue }) => {
    try {
      const { data } = await postApi.getAllPosts();
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
