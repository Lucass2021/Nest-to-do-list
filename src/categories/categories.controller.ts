import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { CategoryIdDTO } from './dto/category-id.dto';

@Controller('/categories')
export class CategoriesController {
  constructor(private readonly CategoriesService: CategoriesService) {}

  // - Criar uma nova categoria
  @Post('/new-category')
  createNewCategory(@Body() createCategoryDTO: CreateCategoryDTO) {
    return this.CategoriesService.createNewCategory(createCategoryDTO);
  }

  // - Listar todas as categorias
  @Get('/')
  findAll() {
    return this.CategoriesService.findAllCategories();
  }

  // - Listar uma categoria
  @Get('/:id')
  findOne(@Param() categoryId: CategoryIdDTO) {
    return this.CategoriesService.findOneCategory(categoryId.id);
  }
}
