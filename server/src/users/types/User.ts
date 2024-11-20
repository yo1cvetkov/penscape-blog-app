import { UserRole } from "../../shared/types/UserRole.enum";

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  profilePicture: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TokenPayload = {
  _id: string;
  email: string;
  role: string;
};
