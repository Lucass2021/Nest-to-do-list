import { IsUUID } from 'class-validator';

export class TaskIdDTO {
  @IsUUID()
  id: string;
}
