import { Controller, Post, Get, Param, Put, Body, Delete, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './DTO/products.create.dto';
import { Product } from './Model/products.model';
import { UpdateProductDTO } from './DTO/products.update.dto';
import { query } from 'express';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'The product has been successfully created.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiBody({ type: CreateProductDTO })
    async create(@Body() createProductDTO: CreateProductDTO): Promise<Product> {
        return await this.productService.create(createProductDTO);
    }

    @Get()
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'Return all products' })
    async findAll(): Promise<Product[]> {
        return await this.productService.findAll();
    }

    @Get('attribute')
    @ApiOperation({ summary: 'Get products by attribute' })
    @ApiResponse({ status: 200, description: 'Return products matching the attribute.' })
    @ApiQuery({ name: 'key', type: String, description: 'Attribute key' })
    @ApiQuery({ name: 'value', type: String, description: 'Attribute value' })
    async findByAtrribute(@Query('key') key: string, @Query('value') value: string): Promise<Product[]> {
        return await this.productService.findByAttribute(key, value);
    }

    @Get('search/by-name')
    @ApiOperation({ summary: 'Search products by name' })
    @ApiResponse({ status: 200, description: 'Return products matching the name.' })
    @ApiQuery({ name: 'name', type: String, description: 'Product name' })
    async findProductByName(@Query('name') name: string): Promise<Product[]> {
        return await this.productService.findProductByName(name);
    }

    @Get('search/by-brand')
    @ApiOperation({ summary: 'Search products by brand' })
    @ApiResponse({ status: 200, description: 'Return products matching the brand.' })
    @ApiQuery({ name: 'brand', type: String, description: 'Product brand' })
    async findProductByBrand(@Query('brand') brand: string): Promise<Product[]> {
        return await this.productService.findProductByBrand(brand);
    }

    @Get('price-range')
    @ApiOperation({ summary: 'Get products within a price range' })
    @ApiResponse({ status: 200, description: 'Return products within the price range.' })
    @ApiQuery({ name: 'minPrice', type: String, description: 'Minimum price' })
    @ApiQuery({ name: 'maxPrice', type: String, description: 'Maximum price' })
    async findByPriceRange(@Query('minPrice') minPrice: string, @Query('maxPrice') maxPrice: string): Promise<Product[]> {
        return await this.productService.findByPriceRange(minPrice, maxPrice);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a product by ID' })
    @ApiResponse({ status: 200, description: 'Return the product with the specified ID.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    @ApiParam({ name: 'id', type: String, description: 'Product ID' })
    async findProductById(@Param('id') id: string): Promise<Product> {
        return await this.productService.findProductById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a product by ID' })
    @ApiResponse({ status: 200, description: 'The product has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    @ApiParam({ name: 'id', type: String, description: 'Product ID' })
    @ApiBody({ type: UpdateProductDTO })
    async update(@Param('id') id: string, @Body() updateProductDTO: UpdateProductDTO): Promise<Product> {
        return await this.productService.update(id, updateProductDTO);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product by ID' })
    @ApiResponse({ status: 200, description: 'The product has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    @ApiParam({ name: 'id', type: String, description: 'Product ID' })
    async delete(@Param('id') id: string): Promise<{}> {
        return await this.productService.delete(id);
    }
}
