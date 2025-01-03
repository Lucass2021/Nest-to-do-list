import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/new-user')
  createNewUser(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.createNewUser(createUserDTO);
  }
}
