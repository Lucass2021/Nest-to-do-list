import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';
import { EditTaskDTO } from './dto/edit-task.dto';

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

  async updateTaskStatus(id: string) {
    const task = await this.taskRepository.findOne({
      where: {
        id: Number(id),
      },
    });

    if (!task.isDone) {
      task.isDone = true;
    } else {
      task.isDone = false;
    }

    await this.taskRepository.save(task);
    return {
      message: 'Task updated successfully',
    };
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

  async editTask(id: string, updatedData: EditTaskDTO) {
    const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(updatedData.dueDate);

    const task = await this.taskRepository.findOne({
      where: {
        id: Number(id),
      },
    });

    if (!task) {
      throw new NotFoundException("Task doesn't exist");
    }

    if (updatedData.dueDate && !isValidFormat) {
      throw new BadRequestException(
        'Invalid dueDate format. Expected YYYY-MM-DD.',
      );
    }

    Object.assign(task, updatedData);
    const updatedTask = await this.taskRepository.save(task);

    return {
      message: 'Task updated successfully',
      task: updatedTask,
    };
  }
}
