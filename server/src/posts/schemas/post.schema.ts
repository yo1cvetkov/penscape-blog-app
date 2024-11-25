import { Schema } from "mongoose";
import { PostStatus } from "../../shared/types/PostStatus.enum";
import { IPost } from "../models/post.model";

const PostSchema: Schema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },
    content: {
      type: String,
      required: function () {
        if (this.status === PostStatus.DRAFT) return false;
        else return true;
      },
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category must be specified"],
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: Object.values(PostStatus),
      default: PostStatus.DRAFT,
    },
    tags: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default PostSchema;
