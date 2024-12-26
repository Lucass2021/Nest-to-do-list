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

  findOne(id: string) {
    return this.taskRepository.findOne({
      where: {
        id: Number(id),
      },
    });
  }

  async updateTaskStatusToDone(id: string) {
    const task = await this.taskRepository.findOne({
      where: {
        id: Number(id),
      },
    });

    if (!task.isDone) {
      task.isDone = true;
    }
    await this.taskRepository.save(task);
    return {
      message: 'Task updated successfully',
    };
  }

  async updateTaskStatusToUndone(id: string) {
    const task = await this.taskRepository.findOne({
      where: {
        id: Number(id),
      },
    });

    if (task.isDone) {
      task.isDone = false;
    }
    await this.taskRepository.save(task);
    return {
      message: 'Task updated successfully',
    };
  }

  async deleteTask(id: string) {
    const task = await this.taskRepository.findOne({
      where: {
        id: Number(id),
      },
    });

    if (task) {
      await this.taskRepository.delete(task);
      return {
        message: 'Task deleted successfully',
      };
    }
  }
}
