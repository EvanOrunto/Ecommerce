import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, SchemaType } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
    @Prop({ required: true })
    name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);