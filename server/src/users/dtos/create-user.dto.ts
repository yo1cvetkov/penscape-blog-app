import { IsString, IsEmail, IsOptional, MinLength, IsStrongPassword, IsEnum } from "class-validator";
import { UserRole } from "../../shared/types/UserRole.enum";

export class CreateUserDTO {
  @IsString({ message: "Username is required." })
  @MinLength(3, { message: "Username must be at least 3 characters long." })
  username: string;

  @IsEmail(
    {},
    {
      message: "Please provide an valid email",
    }
  )
  email: string;

  @IsStrongPassword(
    {
      minLength: 12,
    },
    { message: "Password is too weak" }
  )
  @MinLength(12)
  password: string;

  @IsEnum(UserRole, { message: "Invalid role type" })
  @IsOptional()
  role: UserRole;

  @IsString()
  @IsOptional()
  profilePicture?: string;

  @IsString()
  @IsOptional()
  bio?: string;
}
