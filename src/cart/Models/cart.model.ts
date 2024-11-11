import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { User } from "src/Users/Model/user.model";
import { CartItem, CartItemSchema } from "./cartItem.model";

export type CartDocument = HydratedDocument<Cart>;

@Schema({ timestamps: true })
export class Cart {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    userId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: [CartItemSchema], default: [] })
    items: CartItem[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);