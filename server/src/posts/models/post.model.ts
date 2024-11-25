import mongoose, { Document, Model } from "mongoose";

import { PostStatus } from "../../shared/types/PostStatus.enum";

import PostSchema from "../schemas/post.schema";

import { ObjectId } from "mongodb";

import { JSONValue } from "../../shared/types/JSONValue";

export interface IPost extends Document {
  title: string;
  content: {};
  authorId: typeof ObjectId;
  categoryId: typeof ObjectId;
  tags: string[];
  views: number;
  likes: number;
  status: PostStatus;
}

const Post = mongoose.model<IPost>("Post", PostSchema);

export default Post;
