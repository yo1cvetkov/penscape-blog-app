import { plainToInstance } from "class-transformer";
import { json, NextFunction, Request, Response } from "express";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { AuthService } from "../services/auth.service";
import { ConflictException } from "../../shared/exceptions/ConflictException";
import { BadRequestException } from "../../shared/exceptions/BadRequestException";
import { IUser } from "../models/user.model";
import { LoginUserDTO } from "../dtos/login-user.dto";
import { NotFoundException } from "../../shared/exceptions/NotFoundException";
import { UsersService } from "../services/user.service";
import { User } from "../types/User";

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const createUserDto = plainToInstance(CreateUserDTO, req.body);

      const user = await AuthService.instance.register(createUserDto);

      res.status(201).json(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        res.status(409).json({ message: error.message, cause: error });
      } else if (error instanceof BadRequestException) {
        res.status(400).json({ message: error.message, cause: error });
      } else {
        res.status(500).json({ message: "Something went wrong.", cause: error });
      }
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const loginUserDto = plainToInstance(LoginUserDTO, req.body);
      const user = await AuthService.instance.findUser(loginUserDto);

      const accessToken = AuthService.instance.generateAccessToken({ _id: user._id as string, email: user.email, role: user.role });
      const refreshToken = AuthService.instance.generateRefreshToken({ _id: user._id as string, email: user.email, role: user.role });

      res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 15 * 60 * 1000,
        })
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ message: "Successfully signed in." });
    } catch (error) {
      if (error instanceof BadRequestException) {
        res.status(400).json({ message: error.message, cause: error });
      } else if (error instanceof NotFoundException) {
        res.status(404).json({ message: error.message, cause: error });
      } else {
        res.status(500).json({ message: "Something went wrong", cause: error });
      }
    }
  }

  async whoAmI(req: Request, res: Response): Promise<void> {
    const userId = (req.user as Partial<User>)._id as string;

    try {
      const user = await UsersService.instance.findUserById(userId);

      res.status(200).json(user);
    } catch (error) {
      if (error instanceof NotFoundException) {
        res.status(404).json({ message: "User doesn't exist" });
      } else {
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  }

  logout(req: Request, res: Response): void {
    res.clearCookie("accessToken").clearCookie("refreshToken").status(204).send();
  }

  async refresh(req: Request, res: Response): Promise<void> {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ message: "Refresh token not provided." });
      return;
    }

    const payload = AuthService.instance.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET!);

    if (!payload) {
      res.status(403).json({ message: "Invalid refresh token" });
      return;
    }

    const accessToken = AuthService.instance.generateAccessToken({ _id: payload._id, email: payload.email, role: payload.role });

    const newRefreshToken = AuthService.instance.generateRefreshToken({ _id: payload._id, email: payload.email, role: payload.role });

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Tokens refreshed successfully." });
  }
}
