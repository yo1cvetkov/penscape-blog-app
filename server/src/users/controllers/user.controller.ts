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
}
