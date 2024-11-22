import { Request, Response } from "express";
import { UsersService } from "../services/user.service";
import { NotFoundException } from "../../shared/exceptions/NotFoundException";

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

    if (!req.file || !userId) {
      res.status(400).json({ message: "File is missing" });
      return;
    }

    try {
      const url = await UsersService.instance.updateUserProfilePicture(userId, req.file);

      res.status(201).json(url);
    } catch (error) {
      console.log(error);
      res.status(500).json({ messsage: "Something went wrong" });
    }
  }
}
