import { Schema } from "mongoose";
import { UserRole } from "../../shared/UserRole.enum";

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
      default: UserRole.USER,
    },
    profilePicture: {
      type: String,
      required: false,
      unique: true,
    },
    bio: {
      type: String,
      maxLength: 500,
    },
  },
  {
    timestamps: true,
  }
);

export default UserSchema;
