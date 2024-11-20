import { plainToInstance } from "class-transformer";
import { ConflictException } from "../../shared/exceptions/ConflictException";
import { NotFoundException } from "../../shared/exceptions/NotFoundException";
import { UserRole } from "../../shared/types/UserRole.enum";
import { CreateUserDTO } from "../dtos/create-user.dto";
import User from "../models/user.model";
import { UserDTO } from "../dtos/user.dto";

export class UsersService {
  static #instance: UsersService;

  private constructor() {}

  public static get instance(): UsersService {
    if (!UsersService.#instance) {
      UsersService.#instance = new UsersService();
    }

    return UsersService.#instance;
  }

  async findUser(username: string) {
    const user = await User.findOne({ username });

    if (!user) {
      throw new NotFoundException("User with a given username does not exist.");
    }

    return user;
  }

  async findUserById(id: string) {
    const user = await User.findById(id);

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    const userDto = plainToInstance(UserDTO, user.toObject(), { excludeExtraneousValues: true });

    return userDto;
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
