import { Controller, Post, Get, Param, Put, Body, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './Model/category.model';
import { CreateCategoryDTO } from './DTO/category.create.dto';
import { UpdateCategoryDTO } from './DTO/category.update.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Post()
    async create(@Body() createCategoryDTO: CreateCategoryDTO): Promise<Category> {
        return await this.categoryService.create(createCategoryDTO);
    }

    @Get()
    async findAll(): Promise<Category[]> {
        return await this.categoryService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Category> {
        return await this.categoryService.findOne(id);
    }

    @Put(':id')
    async updateOne(@Param('id') id: string, @Body() updateCategoryDTO: UpdateCategoryDTO): Promise<Category> {
        return await this.categoryService.update(id, updateCategoryDTO);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{}> {
        return await this.categoryService.delete(id);
    }
}
