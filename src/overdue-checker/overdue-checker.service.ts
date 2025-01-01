import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entity/task.entity';

@Injectable()
export class OverdueCheckerService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async checkOverdueTasks() {
    console.log('Verificando tarefas atrasadas...');
    const now = new Date();
    // console.log('now', now);

    const overdueTasks = await this.taskRepository.find({
      where: { overdue: false },
    });

    for (const task of overdueTasks) {
      if (now >= task.dueDate) {
        task.overdue = true;
        await this.taskRepository.save(task);
        console.log(`Tarefa ${task.id} marcada como atrasada.`);
      }
    }
  }
}
