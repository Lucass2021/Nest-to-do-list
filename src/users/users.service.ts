import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { ChangeAvatarDTO } from './dto/change-avatar.dto';
import { BanUserDTO } from './dto/ban-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createNewUser(newUser: CreateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({
      email: newUser.email,
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(newUser.password, saltOrRounds);
    newUser.password = hash;

    const user = this.userRepository.create(newUser);
    return await this.userRepository.save(user);
  }

  async createNewAdmin(newAdmin: CreateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({
      email: newAdmin.email,
    });

    if (existingUser) {
      throw new BadRequestException('Admin already exists');
    }

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(newAdmin.password, saltOrRounds);
    newAdmin.password = hash;

    const user = this.userRepository.create({
      ...newAdmin,
      isAdmin: true,
    });

    return await this.userRepository.save(user);
  }

  async findAllUsers() {
    const users = await this.userRepository.find();

    if (users.length === 0) {
      throw new NotFoundException('No Users found');
    }

    return users;
  }

  async findOneUser(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findAllAdmins() {
    const users = await this.userRepository.find({
      where: {
        isAdmin: true,
      },
    });

    if (users.length === 0) {
      throw new NotFoundException('No Users found');
    }

    return users;
  }

  async changeUserPassword(changePasswordDTO: ChangePasswordDTO) {
    const user = await this.findOneUser(changePasswordDTO.id);

    const isOldPasswordValid = await bcrypt.compare(
      changePasswordDTO.oldPassword,
      user.password,
    );
    if (!isOldPasswordValid) {
      throw new BadRequestException('Invalid old password');
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(
      changePasswordDTO.newPassword,
      saltRounds,
    );

    user.password = hashedNewPassword;
    await this.userRepository.save(user);
    return {
      message: 'User Password updated successfully',
      user: user,
    };
  }

  async changeUserAvatar(changeAvatarDTO: ChangeAvatarDTO) {
    const user = await this.findOneUser(changeAvatarDTO.id);

    user.avatar = changeAvatarDTO.newAvatar;
    await this.userRepository.save(user);
    return {
      message: 'User Avatar updated successfully',
      user: user,
    };
  }

  async banUser(banUserDTO: BanUserDTO) {
    const user = await this.findOneUser(banUserDTO.id);

    user.isBanned = true;
    user.banReason = banUserDTO.banReason;
    user.bannedAt = new Date();
    await this.userRepository.save(user);

    return {
      message: 'User Banned successfully',
      user: user,
    };
  }

  async makeUserAdmin(id: string) {
    const user = await this.findOneUser(id);

    user.isAdmin = true;
    await this.userRepository.save(user);

    return {
      message: 'User made admin successfully',
      user: user,
    };
  }
}
