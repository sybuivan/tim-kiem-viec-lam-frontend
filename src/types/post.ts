export interface IPost {
  id_post: string;
  title: string;
  description: string;
  content: string;
  image: string;
  publishedAt: string | Date;
}

export interface IPostList {
  post_list: IPost[];
  total: number;
}
