import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UserIdDTO } from './dto/user-id.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { ChangeAvatarDTO } from './dto/change-avatar.dto';
import { BanUserDTO } from './dto/ban-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AdminGuard } from './guards/admin.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('/users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // - Criar um novo usuário
  @Post('/new-user')
  createNewUser(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.createNewUser(createUserDTO);
  }

  // - Criar um novo usuário admin
  @Post('/new-admin')
  @UseGuards(JwtAuthGuard, AdminGuard)
  createNewAdmin(@Body() createAdminDTO: CreateUserDTO) {
    return this.usersService.createNewAdmin(createAdminDTO);
  }

  // - Listar todos os usuários
  @Get('/')
  @UseGuards(JwtAuthGuard, AdminGuard)
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  // - Listar um usuário
  @Get('/find-id/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  findOneUser(@Param() userId: UserIdDTO) {
    return this.usersService.findOneUser(userId.id);
  }

  // - Listar um usuário por email
  @Get('/find-email/:email')
  @UseGuards(JwtAuthGuard, AdminGuard)
  findUsersByEmail(@Param('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  // - Listar usuários admin
  @Get('/list-admins')
  @UseGuards(JwtAuthGuard, AdminGuard)
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
  @UseGuards(JwtAuthGuard, AdminGuard)
  banUser(@Body() banUserDTO: BanUserDTO) {
    return this.usersService.banUser(banUserDTO);
  }

  // Tornar usuario admin
  @Patch('/make-admin/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  makeUserAdmin(@Param() userId: UserIdDTO) {
    return this.usersService.makeUserAdmin(userId.id);
  }
}
