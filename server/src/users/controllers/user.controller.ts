import { Request, Response } from "express";
import { UsersService } from "../services/user.service";
import { NotFoundException } from "../../shared/exceptions/NotFoundException";
import { IUser } from "../models/user.model";
import { plainToInstance } from "class-transformer";
import { UpdateUserDTO } from "../dtos/update-user.dto";
import { BadRequestException } from "../../shared/exceptions/BadRequestException";

export class UserController {
  async getUserByUsername(req: Request, res: Response): Promise<void> {
    try {
      const username = req.query.username as string;

      const user = await UsersService.instance.findUser(username);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).json({ message: error.message });
      }

      res.status(500).json({ message: "Something went wrong." });
    }
  }

  async updateUserAvatar(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;

    console.log(userId);

    if (!req.file || !userId) {
      res.status(400).json({ message: "File is missing" });
      return;
    }

    try {
      const name = await UsersService.instance.updateUserProfilePicture(userId, req.file);

      res.status(201).json(name);
    } catch (error) {
      console.log(error);
      res.status(500).json({ messsage: "Something went wrong" });
    }
  }

  async updateUserInfo(req: Request, res: Response): Promise<void> {
    const userId = (req.user as IUser)._id as string;

    if (!req.body) {
      res.status(400).json({ message: "You cannot pass an empty object." });
    }

    const updateUserDto = plainToInstance(UpdateUserDTO, req.body);

    try {
      const updatedUser = await UsersService.instance.updateProfileInfo(userId, updateUserDto);
      res.status(200).json(updatedUser);
    } catch (error) {
      if (error instanceof BadRequestException) {
        res.status(400).json({ message: error.message });
      } else if (error instanceof NotFoundException) {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Something went wrong." });
      }
    }
  }
}
