import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 320, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255, nullable: true })
  avatar?: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isBanned: boolean;

  @Column({ length: 255, nullable: true })
  banReason?: string;

  @Column({ length: 255, nullable: true })
  bannedAt?: Date;

  @Column({ nullable: true })
  lastLoginAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
