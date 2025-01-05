import { IsString, IsUUID } from 'class-validator';

export class BanUserDTO {
  @IsUUID()
  id: string;

  @IsString()
  banReason: string;
}
