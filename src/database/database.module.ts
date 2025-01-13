import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { PrismaRepository } from '../common/repositories/prisma.repository';
import { REPOSITORY_TOKEN } from '../common/repositories/repository.interface';
import { TypeOrmRepository } from '../common/repositories/typeorm.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

dotenv.config();
console.log('process.env.USE_PRISMA', process.env.USE_PRISMA);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'todo_db',
      autoLoadEntities: true,
      synchronize: process.env.ENVIRONMENT === 'PRODUCTION' ? false : true,
    }),
    PrismaModule,
  ],
  providers: [
    {
      provide: REPOSITORY_TOKEN,
      useClass: process.env.USE_PRISMA ? PrismaRepository : TypeOrmRepository,
    },
  ],
  exports: [REPOSITORY_TOKEN],
})
export class DatabaseModule {}
