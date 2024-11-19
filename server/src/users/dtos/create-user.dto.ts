import { IsString, IsEmail, IsOptional, MinLength, IsStrongPassword, IsEnum } from "class-validator";
import { UserRole } from "../../shared/UserRole.enum";

export class CreateUserDTO {
  @IsString()
  @MinLength(3)
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  @MinLength(12)
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;

  @IsString()
  @IsOptional()
  profilePicture?: string;

  @IsString()
  @IsOptional()
  bio?: string;
}
