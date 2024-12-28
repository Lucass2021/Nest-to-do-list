import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: false })
  isDone: boolean;

  @Column({ nullable: true })
  category: string;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;
}
