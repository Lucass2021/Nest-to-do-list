import { DeepPartial } from 'typeorm';

export const REPOSITORY_TOKEN = 'REPOSITORY_TOKEN';

export interface IRepository<T> {
  findAll(): Promise<T[]>;
  findOne(id: number): Promise<T | null>;
  create(entity: Partial<T> | DeepPartial<T>): Promise<T>;
  update(id: number, entity: Partial<T> | DeepPartial<T>): Promise<T>;
  delete(id: number): Promise<void>;
  save(entity: Partial<T> | DeepPartial<T>): Promise<T>;
  findOneBy(options: any): Promise<T | null>;
}
