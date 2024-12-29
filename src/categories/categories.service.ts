import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createNewCategory(newCategory: CreateCategoryDTO): Promise<Category> {
    if (!newCategory.name) {
      throw new BadRequestException('Name is required');
    }

    const category = this.categoryRepository.create(newCategory);
    return await this.categoryRepository.save(category);
  }

  async findAllCategories() {
    const categories = await this.categoryRepository.find();

    if (categories.length === 0) {
      throw new NotFoundException('No categories found');
    }

    return categories;
  }

  async findOneCategory(id: string) {
    const category = await this.categoryRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
