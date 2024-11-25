import { IsMongoId, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateDraftPostDTO {
  @IsString()
  @MinLength(10, { message: "Title must be at least 10 characters long" })
  title: string;

  @IsMongoId()
  @IsNotEmpty()
  authorId: string;

  @IsMongoId()
  @IsNotEmpty()
  categoryId: string;
}
