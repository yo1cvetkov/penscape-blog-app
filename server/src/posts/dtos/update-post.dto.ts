import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { JSONValue } from "../../shared/types/JSONValue";

export class UpdatePostDTO {
  @IsString()
  @IsOptional()
  content?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];
}
