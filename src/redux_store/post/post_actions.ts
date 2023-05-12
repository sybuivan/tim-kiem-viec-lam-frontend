import { createAsyncThunk } from '@reduxjs/toolkit';
import { postApi } from 'src/clients/http/post_api';
import { IPostList, IPost } from 'src/types/post';
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
export const getPostDetail = createAsyncThunk<IPost, string>(
  'post/getPostDetail',
  async (id_post, { rejectWithValue }) => {
    try {
      const { data } = await postApi.getPostDetail(id_post);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);

export const createPost = createAsyncThunk<any, any>(
  'post/createPost',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await postApi.createPost(formData);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);

export const updatePost = createAsyncThunk<any, any>(
  'post/updatePost',
  async ({ formData, id_post }, { rejectWithValue }) => {
    try {
      const { data } = await postApi.updatePost(formData, id_post);
      return data;
    } catch (error: any) {
      toastMessage.setErrors(error);
      return rejectWithValue(error);
    }
  }
);
