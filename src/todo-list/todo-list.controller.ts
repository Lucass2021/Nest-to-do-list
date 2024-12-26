import { Body, Controller, Post } from '@nestjs/common';
import { TodoListService } from './todo-list.service';

@Controller('/todo-list')
export class TodoListController {
  constructor(private readonly TodoListService: TodoListService) {}

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
}
