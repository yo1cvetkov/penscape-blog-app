import { Exclude, Expose } from "class-transformer";
import { IsString, IsEmail, IsEnum } from "class-validator";
import { UserRole } from "../../shared/types/UserRole.enum";

export class UserDTO {
  @Expose()
  @IsString()
  _id: string;

  @Expose()
  @IsString()
  username: string;

  @Expose()
  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  @Expose()
  role: UserRole;

  @IsString()
  @Expose()
  bio: string;

  @Exclude()
  password: string;

  @Expose()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
