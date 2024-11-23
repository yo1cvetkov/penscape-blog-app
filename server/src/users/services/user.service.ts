import { NotFoundException } from "../../shared/exceptions/NotFoundException";
import { UserRole } from "../../shared/types/UserRole.enum";
import User from "../models/user.model";
import { FileService } from "../../files/services/file.service";
import { UpdateUserDTO } from "../dtos/update-user.dto";
import { validate } from "class-validator";
import { BadRequestException } from "../../shared/exceptions/BadRequestException";

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

    const { password, ...userData } = user.toObject();

    if (userData.profilePicture) {
      const url = await FileService.instance.generateSignedUrl(userData.profilePicture);
      userData.profilePicture = url;
    }
    return userData;
  }

  async updateUserProfilePicture(userId: string, file: Express.Multer.File) {
    const name = await FileService.instance.uploadFileToS3(file);

    await User.findByIdAndUpdate(userId, { profilePicture: name });

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

  async updateProfileInfo(userId: string, updateUserDto: UpdateUserDTO) {
    const errors = await validate(updateUserDto);

    if (errors.length > 0) {
      throw new BadRequestException(Object.values(errors[0].constraints!)[0]);
    }

    const updateData: Partial<UpdateUserDTO> = {};

    (Object.keys(updateUserDto) as (keyof UpdateUserDTO)[]).forEach((key) => {
      const value = updateUserDto[key];

      if (value !== undefined && value !== null) {
        updateData[key] = value;
      }
    });

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException("No valid fields provided for update.");
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateData }, { new: true });

    if (!updatedUser) {
      throw new NotFoundException("User not found");
    }

    const { password, ...userData } = updatedUser.toObject();

    return userData;
  }
}
