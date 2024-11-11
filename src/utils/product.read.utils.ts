import { Product } from "../products/Model/products.model";
import { Model, PipelineStage } from "mongoose";

export const fetchProducts = async (productModel: Model<Product>, query: PipelineStage[]): Promise<Product[]> => {
    try {
        return await productModel.aggregate(query).exec();
    } catch (error) {
        throw new Error(`Error fetching products: ${error.message}`);
    }
}