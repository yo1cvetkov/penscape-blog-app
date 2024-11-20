import { validate } from "class-validator";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { BadRequestException } from "../../shared/exceptions/BadRequestException";
import User, { IUser } from "../models/user.model";
import { ConflictException } from "../../shared/exceptions/ConflictException";
import * as bcrypt from "bcrypt";
import { UsersService } from "./user.service";

import jwt, { JwtPayload } from "jsonwebtoken";

import * as dotenv from "dotenv";
import { LoginUserDTO } from "../dtos/login-user.dto";
import { NotFoundException } from "../../shared/exceptions/NotFoundException";
import { TokenPayload } from "../types/User";
import { plainToInstance } from "class-transformer";
import { UserDTO } from "../dtos/user.dto";

dotenv.config();

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
      throw new BadRequestException(Object.values(errors[0].constraints!)[0]);
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

  async findUser(loginUserDto: LoginUserDTO) {
    const errors = await validate(loginUserDto);

    if (errors.length > 0) {
      throw new BadRequestException(Object.values(errors[0].constraints!)[0]);
    }

    const user = await UsersService.instance.findUser(loginUserDto.username);

    const isPasswordCorrect = await bcrypt.compare(loginUserDto.password, user.password);

    if (isPasswordCorrect) {
      return user;
    } else {
      throw new BadRequestException("Password is not correct.");
    }
  }

  generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "15m" });
  }

  generateRefreshToken(payload: TokenPayload): string {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" });
  }

  verifyToken(token: string, secret: string): TokenPayload {
    return jwt.verify(token, secret) as TokenPayload;
  }
}
