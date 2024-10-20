import { IsMongoId, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, Min, MinLength } from "class-validator";
import { isMap } from "util/types";

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1, { message: 'Price should not be less than $1' })
    readonly price: number;

    @IsNotEmpty()
    @IsString()
    @IsMongoId()
    readonly category: string;

    @IsNotEmpty()
    @IsString()
    readonly brand: string;

    @IsNumber()
    @IsOptional()
    readonly rating?: number;

    @IsObject()
    @IsOptional()
    readonly attribute?: Map<string, string>;
}