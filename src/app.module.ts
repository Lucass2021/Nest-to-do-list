import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { DatabaseModule } from './database/database.module';
import { OverdueCheckerModule } from './overdue-checker/overdue-checker.module';
import { PrismaModule } from './prisma/prisma.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

dotenv.config();

@Module({
  imports: [
    DatabaseModule,
    OverdueCheckerModule,
    TasksModule,
    CategoriesModule,
    UsersModule,
    AuthModule,
    DatabaseModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
