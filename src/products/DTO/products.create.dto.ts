import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Min, MinLength } from "class-validator";
import { isMap } from "util/types";

export class CreateProductDTO {
    @ApiProperty({
        description: 'The name of the product',
        example: 'Laptop'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    readonly name: string;

    @ApiProperty({
        description: 'The description of the product',
        example: 'A high-end gaming laptop'
    })
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty({
        description: 'The price of the product',
        example: 1500,
        minimum: 1
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(1, { message: 'Price should not be less than $1' })
    readonly price: number;

    @ApiProperty({
        description: 'The category of the product',
        example: '6711520bd508b20a53c34ecf'
    })
    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly category: string;

    @ApiProperty({
        description: 'The brand of the product',
        example: 'Alienware'
    })
    @IsNotEmpty()
    @IsString()
    readonly brand: string;

    @ApiProperty({
        description: 'The rating of the product',
        example: 4.5,
        required: false
    })
    @IsNumber()
    @IsOptional()
    readonly rating?: number;

    @ApiProperty({
        description: 'Additional attributes of the product',
        example: { color: 'Black', warranty: '2 years' },
        required: false
    })
    @IsObject()
    @IsOptional()
    readonly attribute?: Map<string, string>;
}