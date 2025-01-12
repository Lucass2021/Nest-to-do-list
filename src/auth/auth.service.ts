import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthPayloadDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async login(req: Request) {
    const loginEmail = req.body.email;
    const findUserByEmail = await this.usersService.findUserByEmail(loginEmail);

    if (findUserByEmail.isBanned) {
      return {
        message: findUserByEmail.banReason,
        bannedAt: findUserByEmail.bannedAt,
      };
    }

    findUserByEmail.lastLoginAt = new Date();
    await this.userRepository.save(findUserByEmail);

    return req.user;
  }

  async validateUser({ email, password }: AuthPayloadDto) {
    const findUser = await this.usersService.findUserByEmail(email);

    if (!findUser) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      return null;
    }

    const { id, email: userEmail, isAdmin } = findUser;
    return this.jwtService.sign({ id, userEmail, isAdmin });
  }
}
