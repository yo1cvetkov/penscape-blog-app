import { Schema } from "mongoose";

const CategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    description: {
      type: String,
      required: [false],
    },
  },
  {
    timestamps: true,
  }
);

export default CategorySchema;
