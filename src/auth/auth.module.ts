import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { REPOSITORY_TOKEN } from 'src/common/repositories/repository.interface';
import { DatabaseModule } from 'src/database/database.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: 'USER_REPOSITORY',
      useExisting: REPOSITORY_TOKEN,
      inject: [REPOSITORY_TOKEN],
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
