import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class ChangePasswordDTO {
  @IsUUID()
  @ApiProperty({
    description: 'Your user ID',
    example: '5376a206-ce70-4926-955e-c68e389b734e',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'Your user old password',
    example: 'supersecretoldpassword',
  })
  oldPassword: string;

  @IsString()
  @ApiProperty({
    description: 'Your user new password',
    example: 'supersecretnewpassword',
  })
  newPassword: string;
}
