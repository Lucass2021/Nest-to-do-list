import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserIdDTO } from './dto/user-id.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { ChangeAvatarDTO } from './dto/change-avatar.dto';
import { BanUserDTO } from './dto/ban-user.dto';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // - Criar um novo usuário
  @Post('/new-user')
  createNewUser(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.createNewUser(createUserDTO);
  }

  // - Criar um novo usuário admin
  @Post('/new-admin')
  createNewAdmin(@Body() createAdminDTO: CreateUserDTO) {
    return this.usersService.createNewAdmin(createAdminDTO);
  }

  // - Listar todos os usuários
  @Get('/')
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  // - Listar um usuário
  @Get('/find-id/:id')
  findOneUser(@Param() userId: UserIdDTO) {
    return this.usersService.findOneUser(userId.id);
  }

  // - Listar um usuário por email
  @Get('/find-email/:email')
  findUsersByEmail(@Param('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  // - Listar usuários admin
  @Get('/list-admins')
  findAllAdmins() {
    return this.usersService.findAllAdmins();
  }

  // Trocar senha do usuário
  @Patch('/change-password')
  changeUserPassword(@Body() changePasswordDTO: ChangePasswordDTO) {
    return this.usersService.changeUserPassword(changePasswordDTO);
  }

  // Trocar foto de avatar do usuário
  @Patch('/change-avatar')
  changeUserAvatar(@Body() changeAvatarDTO: ChangeAvatarDTO) {
    return this.usersService.changeUserAvatar(changeAvatarDTO);
  }

  // Banimento de usuário
  @Delete('/ban-user')
  banUser(@Body() banUserDTO: BanUserDTO) {
    return this.usersService.banUser(banUserDTO);
  }
}
