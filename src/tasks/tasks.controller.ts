import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { EditTaskDTO } from './dto/edit-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskIdDTO } from './dto/task-id.dto';

@Controller('/tasks')
export class TasksController {
  constructor(private readonly TaskService: TaskService) {}

  // - Criar uma nova tarefa
  @Post('/new-task')
  async createNewItem(@Body() createTaskDto: CreateTaskDTO) {
    return this.TaskService.createNewItem(createTaskDto);
  }

  // - Listar todas as tarefas
  @Get('/')
  findAll() {
    return this.TaskService.findAllTasks();
  }

  // - Listar uma tarefa
  @Get('find-id/:id')
  findOne(@Param() taskId: TaskIdDTO) {
    return this.TaskService.findOneTask(taskId.id);
  }

  // - Lista todas as tarefas atrasadas (overdue)
  @Get('/overdue')
  checkOverdueTasks() {
    return this.TaskService.checkOverdueTasks();
  }

  // - Lista todas as tarefas concluidas e não concluidas (isDone)
  @Get('/done')
  findAllDoneTasks(@Query('isDone', ParseBoolPipe) isDone: boolean) {
    return this.TaskService.findAllDoneTasks(isDone);
  }

  // - Atualizar o status (feito/não feito)
  @Patch('status/:id')
  updateTaskStatus(@Param() taskId: TaskIdDTO) {
    return this.TaskService.updateTaskStatus(taskId.id);
  }

  // - Deletar uma tarefa
  @Delete('/:id')
  deleteTask(@Param() taskId: TaskIdDTO) {
    return this.TaskService.deleteTask(taskId.id);
  }

  // - Editar uma tarefa
  @Put('edit/:id')
  editTask(@Param() taskId: TaskIdDTO, @Body() editTaskDto: EditTaskDTO) {
    return this.TaskService.editTask(taskId.id, editTaskDto);
  }
}
