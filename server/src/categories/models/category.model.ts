import mongoose, { Document } from "mongoose";
import CategorySchema from "../schemas/category.schema";

export interface ICategory extends Document {
  name: string;
  description?: string;
}

const Category = mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
