import { Controller, Post, Get, Param, Put, Body, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './Model/category.model';
import { CreateCategoryDTO } from './DTO/category.create.dto';
import { UpdateCategoryDTO } from './DTO/category.update.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new category' })
    @ApiBody({ type: CreateCategoryDTO })
    @ApiResponse({
        status: 201,
        description: 'The category has been successfully created.',
        type: Category,
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request. Invalid data.',
    })
    async create(@Body() createCategoryDTO: CreateCategoryDTO): Promise<Category> {
        return await this.categoryService.create(createCategoryDTO);
    }

    @Get()
    @ApiOperation({ summary: 'Get all categories' })
    @ApiResponse({
        status: 200,
        description: 'The list of categories.',
        type: [Category],
    })
    @ApiResponse({
        status: 404,
        description: 'No categories found.',
    })
    async findAll(): Promise<Category[]> {
        return await this.categoryService.findAll();
    }

    @ApiOperation({ summary: 'Get a category by ID' })
    @ApiParam({
        name: 'id',
        description: 'The ID of the category to retrieve',
        example: '12345',
    })
    @ApiResponse({
        status: 200,
        description: 'The category found.',
        type: Category,
    })
    @ApiResponse({
        status: 404,
        description: 'Category not found.',
    })
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Category> {
        return await this.categoryService.findOne(id);
    }

    @ApiOperation({ summary: 'Update a category by ID' })
    @ApiParam({
        name: 'id',
        description: 'The ID of the category to update',
        example: '12345',
    })
    @ApiBody({ type: UpdateCategoryDTO })
    @ApiResponse({
        status: 200,
        description: 'The category has been successfully updated.',
        type: Category,
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request. Invalid data.',
    })
    @ApiResponse({
        status: 404,
        description: 'Category not found.',
    })
    @Put(':id')
    async updateOne(@Param('id') id: string, @Body() updateCategoryDTO: UpdateCategoryDTO): Promise<Category> {
        return await this.categoryService.update(id, updateCategoryDTO);
    }

    @ApiOperation({ summary: 'Delete a category by ID' })
    @ApiParam({
        name: 'id',
        description: 'The ID of the category to delete',
        example: '12345',
    })
    @ApiResponse({
        status: 200,
        description: 'The category has been successfully deleted.',
    })
    @ApiResponse({
        status: 404,
        description: 'Category not found.',
    })
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{}> {
        return await this.categoryService.delete(id);
    }
}
