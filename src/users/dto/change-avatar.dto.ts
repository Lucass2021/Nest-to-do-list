import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class ChangeAvatarDTO {
  @IsUUID()
  @ApiProperty({
    description: 'Your user ID',
    example: '5376a206-ce70-4926-955e-c68e389b734e',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'Your user avatar picture',
    example: 'https://example.com/avatar.jpg',
  })
  newAvatar: string;
}
