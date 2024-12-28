import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { EditTaskDTO } from './dto/edit-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';

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
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.TaskService.findOneTask(id);
  }

  // - Atualizar o status (feito/não feito)
  @Patch('task-status/:id')
  updateTaskStatus(@Param('id') id: string) {
    return this.TaskService.updateTaskStatus(id);
  }

  // - Deletar uma tarefa
  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.TaskService.deleteTask(id);
  }

  // - Editar uma tarefa
  @Put('edit/:id')
  editTask(@Param('id') id: string, @Body() editTaskDto: EditTaskDTO) {
    return this.TaskService.editTask(id, editTaskDto);
  }
}
