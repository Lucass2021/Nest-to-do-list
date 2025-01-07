import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { Repository } from 'typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { EditTaskDTO } from './dto/edit-task.dto';
import { Task } from './entity/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async createNewItem(newTask: CreateTaskDTO, req: any): Promise<Task> {
    const user = req.user;

    if (!newTask.title) {
      throw new BadRequestException('Title is required');
    }

    let category = null;

    if (newTask.category) {
      category = await this.categoriesService.findOneCategory(newTask.category);
    }

    const task = this.taskRepository.create({
      ...newTask,
      isDone: false,
      category,
      user,
    });

    return await this.taskRepository.save(task);
  }

  async findAllTasks() {
    const tasks = await this.taskRepository.find({
      relations: ['category', 'user'],
      order: { dueDate: 'ASC' },
    });

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
      relations: ['category', 'user'],
      order: { dueDate: 'ASC' },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async checkOverdueTasks() {
    const tasks = await this.taskRepository.find({
      relations: ['category', 'user'],
      where: { overdue: true },
      order: { dueDate: 'ASC' },
    });

    if (tasks.length === 0) {
      throw new NotFoundException('No tasks found');
    }

    return tasks;
  }

  async findAllDoneTasks(isDone: boolean) {
    const tasks = await this.taskRepository.find({
      where: { isDone: isDone },
      relations: ['category', 'user'],
      order: { dueDate: 'ASC' },
    });

    if (tasks.length === 0) {
      throw new NotFoundException('No tasks found');
    }

    return tasks;
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
