import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { AuthService } from "../services/auth.service";
import { ConflictException } from "../../shared/exceptions/ConflictException";
import { BadRequestException } from "../../shared/exceptions/BadRequestException";

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const createUserDto = plainToInstance(CreateUserDTO, req.body);

      const user = await AuthService.instance.register(createUserDto);

      res.status(201).json(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        res.status(409).json(error.message);
      } else if (error instanceof BadRequestException) {
        res.status(400).json(error.message);
      } else {
        res.status(500).json({ message: "Something went wrong.", cause: error });
      }
    }
  }
}
