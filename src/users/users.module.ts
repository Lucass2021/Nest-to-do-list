import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { REPOSITORY_TOKEN } from 'src/common/repositories/repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'USER_REPOSITORY',
      useExisting: REPOSITORY_TOKEN,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
