import { Repository, DeepPartial } from 'typeorm';
import { IRepository } from './repository.interface';

export class TypeOrmRepository<T> implements IRepository<T> {
  private readonly repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this.repository = repository;
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findOne(id: number): Promise<T | null> {
    return this.repository.findOneBy({ id } as any);
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    const createdEntity = this.repository.create(entity);
    return this.repository.save(createdEntity);
  }

  async update(id: number, entity: any): Promise<T> {
    await this.repository.update(id, entity);
    const updatedEntity = await this.findOne(id);
    if (!updatedEntity) throw new Error(`Entity not found`);
    return updatedEntity;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async save(entity: DeepPartial<T>): Promise<T> {
    return this.repository.save(entity);
  }

  async findOneBy(options: any): Promise<T | null> {
    return this.repository.findOneBy(options);
  }
}
