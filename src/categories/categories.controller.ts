import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { CategoryIdDTO } from './dto/category-id.dto';
import { EditCategoryDTO } from './dto/edit-category.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@Controller('/categories')
@ApiTags('Categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly CategoriesService: CategoriesService) {}

  @Post('/new-category')
  @ApiOperation({
    summary: 'Creates a new category',
    description:
      'Endpoint to create a new category. Requires authentication with a valid JWT token.',
  })
  createNewCategory(@Body() createCategoryDTO: CreateCategoryDTO) {
    return this.CategoriesService.createNewCategory(createCategoryDTO);
  }

  @Get('/')
  @ApiOperation({
    summary: 'List all categories',
    description:
      'Endpoint to list all categories. Requires authentication with a valid JWT token.',
  })
  findAll() {
    return this.CategoriesService.findAllCategories();
  }

  @Get('find-id/:id')
  @ApiOperation({
    summary: 'List a specific category',
    description:
      'Endpoint to list a specific category. Requires authentication with a valid JWT token.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier for the task (UUID).',
    required: true,
    type: String,
  })
  findOne(@Param() categoryId: CategoryIdDTO) {
    return this.CategoriesService.findOneCategory(categoryId.id);
  }

  @Get('/active')
  @ApiOperation({
    summary: 'List all active categories',
    description:
      'Endpoint to list all active categories. Requires authentication with a valid JWT token.',
  })
  findAllActive() {
    return this.CategoriesService.findAllActiveCategories();
  }

  @Get('/inactive')
  @Get('/active')
  @ApiOperation({
    summary: 'List all inactive categories',
    description:
      'Endpoint to list all inactive categories. Requires authentication with a valid JWT token.',
  })
  findAllInactive() {
    return this.CategoriesService.findAllInactiveCategories();
  }

  @Patch('/status/:id')
  @ApiOperation({
    summary: 'Update category status',
    description:
      'Endpoint to update category status. Requires authentication with a valid JWT token.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier for the task (UUID).',
    required: true,
    type: String,
  })
  updateCategoryStatus(@Param() categoryId: CategoryIdDTO) {
    return this.CategoriesService.updateCategoryStatus(categoryId.id);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Delete a category',
    description:
      'Endpoint to delete a category. Requires authentication with a valid JWT token.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier for the task (UUID).',
    required: true,
    type: String,
  })
  deleteCategory(@Param() categoryId: CategoryIdDTO) {
    return this.CategoriesService.deleteCategory(categoryId.id);
  }

  @Put('edit/:id')
  @ApiOperation({
    summary: 'Edit a category',
    description:
      'Endpoint to edit a category. Requires authentication with a valid JWT token.',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier for the task (UUID).',
    required: true,
    type: String,
  })
  editCategory(
    @Param() categoryId: CategoryIdDTO,
    @Body() editCategoryDto: EditCategoryDTO,
  ) {
    return this.CategoriesService.editCategory(categoryId.id, editCategoryDto);
  }
}
