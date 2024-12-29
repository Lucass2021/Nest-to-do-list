import { IsUUID } from 'class-validator';

export class CategoryIdDTO {
  @IsUUID()
  id: string;
}
