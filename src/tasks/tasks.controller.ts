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
  Req,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { EditTaskDTO } from './dto/edit-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskIdDTO } from './dto/task-id.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@Controller('/tasks')
@ApiTags('Tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly TaskService: TaskService) {}

  @Post('/new-task')
  @ApiOperation({
    summary: 'Creates a new task',
    description:
      'Endpoint to create a new task by providing the title, category and due date in the request body.',
  })
  async createNewItem(
    @Body() createTaskDto: CreateTaskDTO,
    @Req() req: Request,
  ) {
    return this.TaskService.createNewItem(createTaskDto, req);
  }

  @Get('/')
  @ApiOperation({
    summary: 'List all tasks',
    description: 'Endpoint to list all tasks.',
  })
  findAll() {
    return this.TaskService.findAllTasks();
  }

  @Get('find-id/:id')
  @ApiOperation({
    summary: 'List one task by id',
    description:
      'Endpoint to list one task by providing the task id in the request parameters.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier for the task (UUID).',
    required: true,
    type: String,
  })
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
