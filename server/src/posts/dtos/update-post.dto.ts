import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { JSONValue } from "../../shared/types/JSONValue";

export class UpdatePostDTO {
  @IsString()
  @IsOptional()
  content?: string;
}
