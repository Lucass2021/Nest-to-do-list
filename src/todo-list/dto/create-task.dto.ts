import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
