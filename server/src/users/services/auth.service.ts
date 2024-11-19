import { validate } from "class-validator";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { BadRequestException } from "../../shared/exceptions/BadRequestException";
import User, { IUser } from "../models/user.model";
import { ConflictException } from "../../shared/exceptions/ConflictException";
import * as bcrypt from "bcrypt";
import { UsersService } from "./user.service";
export class AuthService {
  static #instance: AuthService;

  private constructor() {}

  public static get instance(): AuthService {
    if (!AuthService.#instance) {
      AuthService.#instance = new AuthService();
    }

    return AuthService.#instance;
  }

  async register(createUserDto: CreateUserDTO): Promise<IUser> {
    const errors = await validate(createUserDto);

    if (errors.length > 0) {
      throw new BadRequestException(Object.values(errors).toString()); // FIXME: Fix this
    }

    const existingEmail = await User.findOne({ email: createUserDto.email });

    if (existingEmail) {
      throw new ConflictException("User with this email already exists.");
    }

    const existingUsername = await User.findOne({ username: createUserDto.username });

    if (existingUsername) {
      throw new ConflictException("User with this username already exists.");
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return await UsersService.instance.createUser({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
      bio: createUserDto.bio,
      profilePicture: createUserDto.profilePicture,
      role: createUserDto.role,
    });
  }
}
