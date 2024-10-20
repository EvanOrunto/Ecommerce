import { Controller, Post, Get, Param, Put, Body, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './DTO/products.create.dto';
import { Product } from './Model/products.model';
import { UpdateProductDTO } from './DTO/products.update.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }

    @Post()
    async create(@Body() createProductDTO: CreateProductDTO): Promise<Product> {
        return await this.productService.create(createProductDTO);
    }

    @Get()
    async findAll(): Promise<Product[]> {
        return await this.productService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Product> {
        return await this.productService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateProductDTO: UpdateProductDTO): Promise<Product> {
        return await this.productService.update(id, updateProductDTO);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{}> {
        return await this.productService.delete(id);
    }
}
