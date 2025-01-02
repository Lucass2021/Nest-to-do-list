import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { OverdueCheckerModule } from './overdue-checker/overdue-checker.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

dotenv.config();

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
    OverdueCheckerModule,
    TasksModule,
    CategoriesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
