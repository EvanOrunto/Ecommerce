import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsNumber, Min } from "class-validator";
import mongoose from "mongoose";

export class CartItemDTO {
    @ApiProperty({
        description: 'The ID of the product',
        example: '5f8f8c44b54764421b7156c9',
        type: String,
    })
    @IsMongoId()
    @IsNotEmpty()
    productId: mongoose.Schema.Types.ObjectId;

    @ApiProperty({
        description: 'The quantity of the product',
        example: 2,
        type: Number,
        minimum: 1,
    })
    @IsNumber()
    @Min(1)
    @IsNotEmpty()
    quantity: number;
}