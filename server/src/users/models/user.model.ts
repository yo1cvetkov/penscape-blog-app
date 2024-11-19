import mongoose, { Document, Model } from "mongoose";
import { UserRole } from "../../shared/UserRole.enum";
import UserSchema from "../schemas/user.schema";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  profilePicture?: string;
  bio?: string;
}

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
