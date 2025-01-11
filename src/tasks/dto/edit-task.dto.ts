import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class EditTaskDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Your task title',
    example: 'Buy groceries',
  })
  title?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'What category your task belongs to (ID)',
    example: 'e1d14bcb-958b-469d-8151-a3adbf5a6e6a',
  })
  category?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({
    description: 'Your task due date',
    example: '2025-01-01T23:50:30.017Z',
  })
  dueDate?: string;
}
