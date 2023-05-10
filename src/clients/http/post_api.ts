import { IPostList } from 'src/types/post';
import { IServiceList, IBuyService, IServiceBuyList } from 'src/types/service';
import { createClient } from './axios_client';

const client = createClient();

export const postApi = {
  getAllPosts: () => {
    return client.get<IPostList>('/post/get-all-posts');
  },
  createPost: (payload: FormData) => {
    return client.get<IPostList>('/post/create-post');
  },
};
