import { IPostList, IPost } from 'src/types/post';
import { createClient } from './axios_client';

import { baseURL } from 'src/config';
const client = createClient(baseURL);

export const postApi = {
  getAllPosts: () => {
    return client.get<IPostList>('/post/get-all-posts');
  },
  getPostDetail: (id_post: string) => {
    return client.get<IPost>(`/post/get-post-detail/${id_post}`);
  },
  createPost: (formData: FormData) => {
    return client.post<any>('/post/create-post', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
  },
  updatePost: (formData: FormData, id_post: string) => {
    return client.put<any>(`/post/update-post/${id_post}`, formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });
  },
};
