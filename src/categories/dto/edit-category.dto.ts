import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class EditCategoryDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Your category name',
    example: 'Groceries',
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Your category description',
    example: 'Groceries List',
  })
  description?: string;
}
