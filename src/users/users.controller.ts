import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

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
}
