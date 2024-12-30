import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { EditCategoryDTO } from './dto/edit-category.dto';
import { isUUID } from 'class-validator';

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
    if (!isUUID(id)) {
      throw new NotFoundException('Category not found');
    }

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

  async findAllActiveCategories() {
    const activeCategories = await this.categoryRepository.find({
      where: {
        isActive: true,
      },
    });

    if (activeCategories.length === 0) {
      throw new NotFoundException('No active categories found');
    }

    return activeCategories;
  }

  async updateCategoryStatus(id: string) {
    const category = await this.findOneCategory(id);

    if (!category.isActive) {
      category.isActive = true;
    } else {
      category.isActive = false;
    }

    await this.categoryRepository.save(category);
    return {
      message: 'Category updated successfully',
      task: category,
    };
  }

  async deleteCategory(id: string) {
    const category = await this.findOneCategory(id);

    if (category) {
      await this.categoryRepository.remove(category);
      return {
        message: 'Category deleted successfully',
        category: category,
      };
    }
  }

  async editCategory(id: string, updatedData: EditCategoryDTO) {
    const category = await this.findOneCategory(id);

    Object.assign(category, updatedData);
    const updatedTask = await this.categoryRepository.save(category);

    return {
      message: 'Task updated successfully',
      category: updatedTask,
    };
  }
}
