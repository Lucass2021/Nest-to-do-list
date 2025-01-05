import { IsString, IsUUID } from 'class-validator';

export class ChangeAvatarDTO {
  @IsUUID()
  id: string;

  @IsString()
  newAvatar: string;
}
