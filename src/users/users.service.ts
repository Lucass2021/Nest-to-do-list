import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';

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
}
