import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from 'src/categories/categories.module';
import { Task } from './entity/task.entity';
import { TasksController } from './tasks.controller';
import { TaskService } from './tasks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), CategoriesModule],
  controllers: [TasksController],
  providers: [TaskService],
})
export class TasksModule {}
