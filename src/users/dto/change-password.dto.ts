import { IsString, IsUUID } from 'class-validator';

export class ChangePasswordDTO {
  @IsUUID()
  id: string;

  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
