import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import LikeSchema from "../schemas/likes.schema";

export interface ILike extends Document {
  userId: typeof ObjectId;
  postId: typeof ObjectId;
}

const Like = mongoose.model<ILike>("Like", LikeSchema);

export default Like;
