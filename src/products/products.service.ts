import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './Model/products.model';
import { Model } from 'mongoose';
import { CreateProductDTO } from './DTO/products.create.dto';
import { UpdateProductDTO } from './DTO/products.update.dto';

@Injectable()
export class ProductsService {
    constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>) { }

    async create(createProductDTO: CreateProductDTO): Promise<Product> {
        const product = new this.productModel(createProductDTO); 
        return await product.save();
    }

    async findAll(): Promise<Product[]> {
        return await this.productModel.find().exec();
    }

    async findOne(id: string): Promise<Product> {
        return await this.productModel.findById(id).exec();
    }

    async update(id: string, updateProductDTO: UpdateProductDTO): Promise<Product> {
        return await this.productModel.findByIdAndUpdate(id, updateProductDTO, { new: true }).exec();
    }

    async delete(id: string): Promise<{}> {
        await this.productModel.findByIdAndDelete(id);
        return { sucess: true };
    }
}
