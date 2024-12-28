import { IsOptional, IsString, IsDateString } from 'class-validator';

export class EditTaskDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
