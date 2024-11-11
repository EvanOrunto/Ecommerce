import { Type } from "class-transformer";
import { IsArray, IsMongoId, IsNotEmpty, ValidateNested } from "class-validator";
import { CartItemDTO } from "./cartItem.dto";
import mongoose from "mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class CartDTO {
    @ApiProperty({
        description: "The ID of the user",
        example: "672cfc378ba0a940f0efd995",
        type: String,
    })
    @IsMongoId()
    @IsNotEmpty()
    userId: mongoose.Schema.Types.ObjectId;

    @ApiProperty({
        description: "List of items in the cart",
        type: [CartItemDTO]
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CartItemDTO)
    items: CartItemDTO[];
}