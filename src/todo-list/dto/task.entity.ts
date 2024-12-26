import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  isDone: boolean;

  @Column({ nullable: true })
  category: string;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;
}
