import { Schema } from "mongoose";
import { ILike } from "../models/likes.model";

const LikeSchema: Schema = new Schema<ILike>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is required"],
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "PostId is required"],
    },
  },
  { timestamps: true }
);

export default LikeSchema;
