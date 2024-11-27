import { Schema } from "mongoose";
import { IComment } from "../models/comment.model";

const CommentSchema: Schema = new Schema<IComment>(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "AuthorId is required"],
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "PostId is required"],
    },
    content: {
      type: String,
      required: [true, "Comment must not be empty"],
    },
  },
  { timestamps: true }
);

export default CommentSchema;
