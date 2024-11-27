import mongoose, { Document, Model } from "mongoose";
import { ObjectId } from "mongodb";
import CommentSchema from "../schemas/comment.schema";

export interface IComment extends Document {
  authorId: typeof ObjectId;
  postId: typeof ObjectId;
  content: string;
}

const Comment = mongoose.model<IComment>("Comment", CommentSchema);

export default Comment;
