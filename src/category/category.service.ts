import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './Model/category.model';
import { Model } from 'mongoose';
import { CreateCategoryDTO } from './DTO/category.create.dto';
import { UpdateCategoryDTO } from './DTO/category.update.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private readonly categoryModel: Model<Category>) { }

    async create(createCategoryDTO: CreateCategoryDTO): Promise<Category> {
        const category = new this.categoryModel(createCategoryDTO);
        return await category.save();
    }

    async findAll(): Promise<Category[]> {
        return await this.categoryModel.find().exec();
    }

    async findOne(id: string): Promise<Category> {
        return await this.categoryModel.findById(id).exec();
    }

    async update(id: string, updateCategoryDTO: UpdateCategoryDTO): Promise<Category> {
        return await this.categoryModel.findByIdAndUpdate(id, updateCategoryDTO, { new: true }).exec();
    }

    async delete(id: string): Promise<{}> {
        await this.categoryModel.findByIdAndDelete(id);
        return { success: true };
    }
}
