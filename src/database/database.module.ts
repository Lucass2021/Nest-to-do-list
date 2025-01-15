import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { PrismaRepository } from '../common/repositories/prisma.repository';
import { REPOSITORY_TOKEN } from '../common/repositories/repository.interface';
import { TypeOrmRepository } from '../common/repositories/typeorm.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { User } from 'src/users/entity/user.entity';

dotenv.config();
const isPrisma = process.env.USE_PRISMA === 'true';
console.log('isPrisma', isPrisma);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'todo_db',
      entities: [User],
      autoLoadEntities: true,
      synchronize: process.env.ENVIRONMENT === 'PRODUCTION' ? false : true,
    }),
    TypeOrmModule.forFeature([User]),
    PrismaModule,
  ],
  providers: [
    {
      provide: REPOSITORY_TOKEN,
      useClass: isPrisma ? PrismaRepository : TypeOrmRepository,
    },
    {
      provide: 'USER_REPOSITORY',
      useExisting: REPOSITORY_TOKEN,
    },
  ],
  exports: [REPOSITORY_TOKEN],
})
export class DatabaseModule {}
