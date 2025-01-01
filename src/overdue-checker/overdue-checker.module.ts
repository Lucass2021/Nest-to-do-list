import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entity/task.entity';
import { OverdueCheckerService } from './overdue-checker.service';
import { OverdueCheckerController } from './overdue-checker.controller';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([Task])],
  providers: [OverdueCheckerService],
  controllers: [OverdueCheckerController],
})
export class OverdueCheckerModule {}
