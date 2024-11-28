import { IsMongoId } from "class-validator";

export class CreateLikeDTO {
  @IsMongoId()
  postId?: string;

  @IsMongoId()
  userId: string;
}
