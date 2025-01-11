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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@Controller('/users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/new-user')
  @ApiOperation({
    summary: 'Creates a new user',
    description: 'Endpoint to create a new user.',
  })
  createNewUser(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.createNewUser(createUserDTO);
  }

  @Post('/new-admin')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({
    summary: 'Creates a new admin',
    description: 'Endpoint to create a new admin.',
  })
  createNewAdmin(@Body() createAdminDTO: CreateUserDTO) {
    return this.usersService.createNewAdmin(createAdminDTO);
  }

  @Get('/')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({
    summary: 'List all users',
    description: 'Endpoint to list all users.',
  })
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get('/find-id/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({
    summary: 'List one user by id',
    description: 'Endpoint to list one user by id.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier for the user (UUID).',
    required: true,
    type: String,
  })
  findOneUser(@Param() userId: UserIdDTO) {
    return this.usersService.findOneUser(userId.id);
  }

  @Get('/find-email/:email')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({
    summary: 'List one user by email',
    description: 'Endpoint to list one user by email.',
  })
  @ApiParam({
    name: 'email',
    description: 'The email of the user.',
    required: true,
    type: String,
  })
  findUsersByEmail(@Param('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @Get('/list-admins')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({
    summary: 'List all admins',
    description: 'Endpoint to list all admins.',
  })
  findAllAdmins() {
    return this.usersService.findAllAdmins();
  }

  @Patch('/change-password')
  @ApiOperation({
    summary: 'Change user password',
    description: 'Endpoint to change user password.',
  })
  changeUserPassword(@Body() changePasswordDTO: ChangePasswordDTO) {
    return this.usersService.changeUserPassword(changePasswordDTO);
  }

  @Patch('/change-avatar')
  @ApiOperation({
    summary: 'Change user avatar',
    description: 'Endpoint to change user avatar.',
  })
  changeUserAvatar(@Body() changeAvatarDTO: ChangeAvatarDTO) {
    return this.usersService.changeUserAvatar(changeAvatarDTO);
  }

  @Delete('/ban-user')
  @ApiOperation({
    summary: 'Ban user',
    description: 'Endpoint to ban user.',
  })
  @UseGuards(JwtAuthGuard, AdminGuard)
  banUser(@Body() banUserDTO: BanUserDTO) {
    return this.usersService.banUser(banUserDTO);
  }

  @Patch('/make-admin/:id')
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({
    summary: 'Change user role to admin',
    description: 'Endpoint to change user role to admin.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier for the user (UUID).',
    required: true,
    type: String,
  })
  makeUserAdmin(@Param() userId: UserIdDTO) {
    return this.usersService.makeUserAdmin(userId.id);
  }
}
