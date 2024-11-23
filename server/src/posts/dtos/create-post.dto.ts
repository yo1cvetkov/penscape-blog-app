import { ArrayNotEmpty, IsArray, IsEnum, IsInt, IsJSON, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { JSONValue } from "../../shared/types/JSONValue";
import { PostStatus } from "../../shared/types/PostStatus.enum";

export class CreatePostDTO {
  @IsString()
  @MinLength(10, { message: "Title must be at least 10 characters long" })
  title: string;

  @IsNotEmpty()
  content: JSONValue;

  @IsMongoId()
  @IsNotEmpty()
  authorId: string;

  @IsMongoId()
  @IsNotEmpty()
  categoryId: string;

  @IsInt()
  @IsOptional()
  likes: number;

  @IsInt()
  @IsOptional()
  views: number;

  @IsEnum(PostStatus)
  @IsOptional()
  status: PostStatus;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];
}
