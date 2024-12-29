import { IsDateString, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/categories/entity/category.entity';

export class CreateTaskDTO {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  category?: Category;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
