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
import { TodoListService } from './todo-list.service';
import { EditTaskDTO } from './dto/edit-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';

@Controller('/todo-list')
export class TodoListController {
  constructor(private readonly TodoListService: TodoListService) {}

  // - Criar uma nova tarefa
  @Post('/new-task')
  async createNewItem(@Body() createTaskDto: CreateTaskDTO) {
    return this.TodoListService.createNewItem(createTaskDto);
  }

  // - Listar todas as tarefas
  @Get('/')
  findAll() {
    return this.TodoListService.findAllTasks();
  }

  // - Listar uma tarefa
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.TodoListService.findOneTask(id);
  }

  // - Atualizar o status (feito/não feito)
  @Patch('task-status/:id')
  updateTaskStatus(@Param('id') id: string) {
    return this.TodoListService.updateTaskStatus(id);
  }

  // - Deletar uma tarefa
  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.TodoListService.deleteTask(id);
  }

  // - Editar uma tarefa
  @Put('edit/:id')
  editTask(@Param('id') id: string, @Body() editTaskDto: EditTaskDTO) {
    return this.TodoListService.editTask(id, editTaskDto);
  }
}
