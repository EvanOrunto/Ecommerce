import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { OrderStatus } from "../enum/status.enum";
import { Cart } from "src/cart/Models/cart.model";

export type OrderDocument = HydratedDocument<Order>;

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Cart.name, required: true })
    cart: mongoose.Schema.Types.ObjectId;

    @Prop()
    totalAmount: number;

    @Prop({ required: true, enum: OrderStatus, default: OrderStatus.PENDING })
    status: string;

    @Prop()
    paymentId?: string;

    @Prop()
    shippingAddress: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
