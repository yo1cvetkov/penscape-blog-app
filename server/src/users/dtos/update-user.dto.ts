import { IsString, IsOptional, IsEmail, MinLength, Min } from "class-validator";

export class UpdateUserDTO {
  @IsString()
  @IsOptional()
  @MinLength(4, { message: "Username must be at least 4 characters long" })
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(20, { message: "Bio must be at least 20 characters long" })
  bio?: string;
}
