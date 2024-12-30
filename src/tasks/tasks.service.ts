import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';
import { EditTaskDTO } from './dto/edit-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { CategoriesService } from 'src/categories/categories.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async createNewItem(newTask: CreateTaskDTO): Promise<Task> {
    if (!newTask.title) {
      throw new BadRequestException('Title is required');
    }

    const category = await this.categoriesService.findOneCategory(
      newTask.category,
    );

    const task = this.taskRepository.create({
      ...newTask,
      isDone: false,
      category,
    });

    return await this.taskRepository.save(task);
  }

  async findAllTasks() {
    const tasks = await this.taskRepository.find();

    if (tasks.length === 0) {
      throw new NotFoundException('No tasks found');
    }

    return tasks;
  }

  async findOneTask(id: string) {
    const task = await this.taskRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async updateTaskStatus(id: string) {
    const task = await this.findOneTask(id);

    if (!task.isDone) {
      task.isDone = true;
    } else {
      task.isDone = false;
    }

    await this.taskRepository.save(task);
    return {
      message: 'Task updated successfully',
      task: task,
    };
  }

  async deleteTask(id: string) {
    const task = await this.findOneTask(id);

    if (task) {
      await this.taskRepository.remove(task);
      return {
        message: 'Task deleted successfully',
        task: task,
      };
    }
  }

  async editTask(id: string, updatedData: EditTaskDTO) {
    const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(updatedData.dueDate);
    const task = await this.findOneTask(id);

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
