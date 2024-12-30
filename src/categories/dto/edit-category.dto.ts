import { IsString, IsOptional } from 'class-validator';

export class EditCategoryDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
