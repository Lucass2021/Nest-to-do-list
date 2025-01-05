import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserIdDTO } from './dto/user-id.dto';

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
  @Get('find-id/:id')
  findOneUser(@Param() userId: UserIdDTO) {
    return this.usersService.findOneUser(userId.id);
  }

  // - Listar um usuário por email
  @Get('find-email/:email')
  findUsersByEmail(@Param('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  // - Listar usuários admin
}
