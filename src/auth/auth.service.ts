import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser({ email, password }: AuthPayloadDto) {
    const findUser = await this.usersService.findUserByEmail(email);

    if (!findUser) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.password);
    if (!isPasswordValid) {
      return null;
    }

    const { id, email: userEmail } = findUser;
    return this.jwtService.sign({ id, userEmail });
  }
}
