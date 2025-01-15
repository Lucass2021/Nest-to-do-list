import { PrismaClient } from '@prisma/client';
import { IRepository } from './repository.interface';

export class PrismaRepository<T> implements IRepository<T> {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly modelName: string,
  ) {}

  private get model() {
    return (this.prisma as any)[this.modelName];
  }

  async find(options?: any): Promise<T[]> {
    return this.model.findMany(options);
  }

  async findOne(options: any): Promise<T | null> {
    return this.model.findFirst({ where: options });
  }

  async create(entity: Partial<T>): Promise<T> {
    return this.model.create({ data: entity });
  }

  async update(id: number, entity: Partial<T>): Promise<T> {
    return this.model.update({ where: { id }, data: entity });
  }

  async delete(id: number): Promise<void> {
    await this.model.delete({ where: { id } });
  }

  async save(entity: Partial<T>): Promise<T> {
    return this.model.create({ data: entity });
  }

  async findOneBy(options: any): Promise<T | null> {
    return this.model.findFirst({ where: options });
  }
}
