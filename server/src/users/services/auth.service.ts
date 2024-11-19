import { validate } from "class-validator";
import { CreateUserDTO } from "../dtos/create-user.dto";
import { UsersService } from "./user.service";
import { BadRequestException } from "../../shared/exceptions/BadRequestException";

export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(createUserDto: CreateUserDTO) {
    const errors = await validate(createUserDto);

    if (errors.length > 0) {
      throw new BadRequestException(Object.values(errors).toString()); // FIXME: Fix this
    }
  }
}
