export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  AUTHOR = "author",
}

export type User = {
  _id: string;
  username: string;
  email: string;
  role: UserRole;
  bio?: string;
};

export type CreateUser = {
  username: string;
  email: string;
  password: string;
  bio?: string;
};
