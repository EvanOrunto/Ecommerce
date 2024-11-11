import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Category, CategoryDocument } from "src/category/Model/category.model";

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
    @Prop({ required: true })
    name: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    category: Category;

    @Prop({ required: true })
    brand: string;

    @Prop({ default: 0 })
    rating: number;

    @Prop({ type: Map, of: String })
    attribute: Map<string, string>; // Example could be size, color and material
}

const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.pre('save', async function (next) {
    const product = this as ProductDocument;
    await product.populate('category');
    next();
});

export { ProductSchema };