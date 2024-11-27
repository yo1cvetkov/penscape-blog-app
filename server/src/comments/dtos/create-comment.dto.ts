import { IsMongoId, IsString, MinLength } from "class-validator";

export class CreateCommentDTO {
  @IsMongoId()
  authorId: string;

  @IsMongoId()
  postId: string;

  @IsString()
  @MinLength(20, { message: "Comment must be at least 20 characters long." })
  content: string;
}
