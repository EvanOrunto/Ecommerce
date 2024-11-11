import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Product } from "src/products/Model/products.model";

export type CartItemDocument = HydratedDocument<CartItem>;

@Schema({ timestamps: true })
export class CartItem {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name, required: true })
    productId: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true, default: 1 })
    quantity: number;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);