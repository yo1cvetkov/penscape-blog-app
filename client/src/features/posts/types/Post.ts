import { PostStatus } from "./PostStatus";

export type Post = {
  _id: string;
  title: string;
  content?: any;
  authorId: string;
  categoryId: string;
  views: number;
  likes: number;
  comments: number;
  status: PostStatus;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
};
