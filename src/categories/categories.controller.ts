import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { CategoryIdDTO } from './dto/category-id.dto';
import { EditCategoryDTO } from './dto/edit-category.dto';

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
  @Get('find-id/:id')
  findOne(@Param() categoryId: CategoryIdDTO) {
    return this.CategoriesService.findOneCategory(categoryId.id);
  }

  // - Listar todas as categorias ativas
  @Get('/active')
  findAllActive() {
    return this.CategoriesService.findAllActiveCategories();
  }

  // - Listar todas as categorias inativas
  @Get('/inactive')
  findAllInactive() {
    return this.CategoriesService.findAllInactiveCategories();
  }

  // - Atualizar o status (ativo/não ativo)
  @Patch('/status/:id')
  updateCategoryStatus(@Param() categoryId: CategoryIdDTO) {
    return this.CategoriesService.updateCategoryStatus(categoryId.id);
  }

  // - Deletar uma categoria
  @Delete('/:id')
  deleteCategory(@Param() categoryId: CategoryIdDTO) {
    return this.CategoriesService.deleteCategory(categoryId.id);
  }

  // - Editar uma tarefa
  @Put('edit/:id')
  editCategory(
    @Param() categoryId: CategoryIdDTO,
    @Body() editCategoryDto: EditCategoryDTO,
  ) {
    return this.CategoriesService.editCategory(categoryId.id, editCategoryDto);
  }
}
