import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class BanUserDTO {
  @IsUUID()
  @ApiProperty({
    description: 'Your user ID',
    example: '5376a206-ce70-4926-955e-c68e389b734e',
  })
  id: string;

  @IsString()
  @ApiProperty({
    description: 'The reason why you are banning the user',
    example: 'Spamming',
  })
  banReason: string;
}
