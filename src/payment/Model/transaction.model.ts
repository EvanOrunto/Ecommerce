import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Order } from "src/orders/model/order.model";
import { User } from "src/Users/Model/user.model";

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
    @Prop()
    email: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Order.name, required: true })
    orderId: mongoose.Schema.Types.ObjectId;

    @Prop({ required: true })
    amount: string;

    @Prop({ required: true })
    reference: string;

    @Prop({ required: true })
    status: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);