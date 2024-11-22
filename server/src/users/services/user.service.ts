import { plainToInstance } from "class-transformer";
import { ConflictException } from "../../shared/exceptions/ConflictException";
import { NotFoundException } from "../../shared/exceptions/NotFoundException";
import { UserRole } from "../../shared/types/UserRole.enum";
import { CreateUserDTO } from "../dtos/create-user.dto";
import User from "../models/user.model";
import { UserDTO } from "../dtos/user.dto";
import { FileService } from "../../files/services/file.service";
import sharp from "sharp";

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

    console.log(id);

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    // const userDto = plainToInstance(UserDTO, user.toObject(), { excludeExtraneousValues: true });

    console.log(user);

    if (user.profilePicture) {
      const url = await FileService.instance.generateSignedUrl(user.profilePicture);
      user.profilePicture = url;
    }
    return user;
  }

  async updateUserProfilePicture(userId: string, file: Express.Multer.File) {
    const buffer = await sharp(file.buffer).resize({ height: 100, width: 100, fit: "contain" }).toBuffer();

    const name = await FileService.instance.uploadFileToS3(file, buffer);

    const user = await User.findByIdAndUpdate(userId, { profilePicture: name });

    return name;
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
