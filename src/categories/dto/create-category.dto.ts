import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDTO {
  @IsString()
  @ApiProperty({
    description: 'Your category name',
    example: 'Groceries',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Your category description',
    example: 'Groceries List',
  })
  description?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description: 'Your category status',
    example: 'true',
  })
  isActive?: boolean;
}
