import { ConflictException } from "../../shared/exceptions/ConflictException";
import { NotFoundException } from "../../shared/exceptions/NotFoundException";
import { UserRole } from "../../shared/UserRole.enum";
import { CreateUserDTO } from "../dtos/create-user.dto";
import User from "../models/user.model";

export class UsersService {
  async findUser(username: string) {
    const user = await User.findOne({ username });

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    return user;
  }

  async createUser({
    username,
    email,
    password,
    role,
    profilePicture,
    bio,
  }: {
    username: string;
    email: string;
    password: string;
    role?: UserRole;
    profilePicture?: string;
    bio?: string;
  }) {
    const user = await User.create({ email, username, password, role, profilePicture, bio });

    return await user.save();
  }
}
