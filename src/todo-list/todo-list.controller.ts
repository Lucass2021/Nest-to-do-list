import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TodoListService } from './todo-list.service';

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
    return this.TodoListService.findAll();
  }

  // - Listar uma tarefa
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.TodoListService.findOne(id);
  }
}
