import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @ApiProperty({
    description: 'Your user full name',
    example: 'John Doe',
  })
  name: string;

  @IsEmail()
  @ApiProperty({
    description: 'Your user email',
    example: 'johndoe@gmail.com',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Your user password',
    example: 'supersecretpassword',
  })
  password: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Your user avatar picture',
    example: 'https://example.com/avatar.jpg',
  })
  avatar?: string;
}
