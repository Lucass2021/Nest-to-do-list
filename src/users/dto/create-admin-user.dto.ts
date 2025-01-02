import { IsBoolean } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';

export class CreateAdminDTO extends CreateUserDTO {
  @IsBoolean()
  isAdmin: boolean;
}
