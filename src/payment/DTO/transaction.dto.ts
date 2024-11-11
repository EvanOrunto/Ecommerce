import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import mongoose from "mongoose";

export class TransactionDTO {
    @ApiProperty({
        description: 'The unique identifier for the order.',
        example: '67293c4771729532cca44886',
    })
    @IsMongoId()
    @IsNotEmpty()
    orderId: mongoose.Schema.Types.ObjectId;
}