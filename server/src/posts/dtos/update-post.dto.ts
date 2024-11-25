import { IsNotEmpty, IsOptional } from "class-validator";
import { JSONValue } from "../../shared/types/JSONValue";

export class UpdatePostDTO {
  @IsNotEmpty()
  @IsOptional()
  content: JSONValue;
}
