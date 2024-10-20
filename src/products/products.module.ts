import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './Model/products.model';
import { Category, CategorySchema } from 'src/category/Model/category.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),],
    providers: [ProductsService],
    controllers: [ProductsController]
})
export class ProductsModule { }
