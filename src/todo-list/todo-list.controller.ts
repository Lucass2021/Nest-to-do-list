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

@Controller('/todo-list')
export class TodoListController {
  constructor(private readonly TodoListService: TodoListService) {}

  // - Criar uma nova tarefa
  @Post('/new-task')
  async createNewItem(
    @Body('title') title: string,
    @Body('category') category: string,
    @Body('dueDate') dueDate: string,
  ) {
    return this.TodoListService.createNewItem(
      title,
      category,
      dueDate ? new Date(dueDate) : null,
    );
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

  // - Atualizar o status (feito)
  @Patch('done/:id')
  updateTaskStatusToDone(@Param('id') id: string) {
    return this.TodoListService.updateTaskStatusToDone(id);
  }

  // - Atualizar o status (não feito)
  @Patch('undone/:id')
  updateTaskStatusToUndone(@Param('id') id: string) {
    return this.TodoListService.updateTaskStatusToUndone(id);
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
