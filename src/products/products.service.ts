import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './Model/products.model';
import { Model, PipelineStage } from 'mongoose';
import { CreateProductDTO } from './DTO/products.create.dto';
import { UpdateProductDTO } from './DTO/products.update.dto';
import { fetchProducts } from '../utils/product.read.utils';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) { }

    async create(createProductDTO: CreateProductDTO): Promise<Product> {
        const product = new this.productModel(createProductDTO);
        await product.populate('category');
        return await product.save();
    }

    async findAll(): Promise<Product[]> {
        return await this.productModel.find().populate('category').exec();
    }

    async findProductById(id: string): Promise<Product> {
        return await this.productModel.findById(id).populate('category').exec();
    }

    async findProductByName(name: string): Promise<Product[]> {
        const query: PipelineStage[] = [{ $match: { name: { $regex: name, $options: 'i' } } }]; // case sensitive search
        return await fetchProducts(this.productModel, query);
    }

    async findProductByBrand(brand: string): Promise<Product[]> {
        const query: PipelineStage[] = [{ $match: { brand: { $regex: brand, $options: 'i' } } }];
        return await fetchProducts(this.productModel, query);
    }

    async findByAttribute(attributeKey: string, attributeValue: string): Promise<Product[]> {
        const query: PipelineStage[] = [{ $match: { [`attribute.${attributeKey}`]: attributeValue } }];
        return await fetchProducts(this.productModel, query);
    }

    async findByPriceRange(minPrice: string, maxPrice: string): Promise<Product[]> {
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);

        const query: PipelineStage[] = [{ $match: { price: { $gte: min, $lte: max } } }];
        return await fetchProducts(this.productModel, query);
    }

    async update(id: string, updateProductDTO: UpdateProductDTO): Promise<Product> {
        return await this.productModel.findByIdAndUpdate(id, updateProductDTO, { new: true }).exec();
    }

    async delete(id: string): Promise<{}> {
        await this.productModel.findByIdAndDelete(id);
        return { sucess: true };
    }
}
