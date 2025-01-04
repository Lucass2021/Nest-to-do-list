import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
  {
    id: 1,
    username: 'Lucas',
    password: '123',
  },
  {
    id: 2,
    username: 'Zeca',
    password: '123',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser({ username, password }: AuthPayloadDto) {
    const findUser = fakeUsers.find((user) => user.username === username);

    if (!findUser) return null;

    if (password === findUser.password) {
      const { id, username } = findUser;
      return this.jwtService.sign({ id, username });
    }
  }
}
