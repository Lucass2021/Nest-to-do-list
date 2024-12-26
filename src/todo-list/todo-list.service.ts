import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './dto/task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createNewItem(
    title: string,
    category?: string,
    dueDate?: Date,
  ): Promise<Task> {
    const task = this.taskRepository.create({
      title,
      category,
      dueDate,
      isDone: false,
    });

    return await this.taskRepository.save(task);
  }

  findAll() {
    return this.taskRepository.find();
  }
}
