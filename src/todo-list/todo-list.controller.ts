import { Controller, Get } from '@nestjs/common';
import { TodoListService } from './todo-list.service';

@Controller('todo-list')
export class TodoListController {
  constructor(private readonly TodoListService: TodoListService) {}

  @Get()
  createNewItem() {
    return this.TodoListService.createNewItem();
  }
}
