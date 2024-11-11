import { PartialType } from "@nestjs/mapped-types";
import { CreateProductDTO } from "./products.create.dto";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateProductDTO extends PartialType(CreateProductDTO) {
    @ApiPropertyOptional({
        description: 'The name of the product',
        example: 'Laptop'
    })
    readonly name?: string;

    @ApiPropertyOptional({
        description: 'The description of the product',
        example: 'A high-end gaming laptop'
    })
    readonly description?: string;

    @ApiPropertyOptional({
        description: 'The price of the product',
        example: 1500,
        minimum: 1
    })
    readonly price?: number;

    @ApiPropertyOptional({
        description: 'The category of the product',
        example: '672d0d6a9422c7f1d9afd883'
    })
    readonly category?: string;

    @ApiPropertyOptional({
        description: 'The brand of the product',
        example: 'Alienware'
    })
    readonly brand?: string;

    @ApiPropertyOptional({
        description: 'The rating of the product',
        example: 4.5
    })
    readonly rating?: number;

    @ApiPropertyOptional({
        description: 'Additional attributes of the product',
        example: { color: 'Black', warranty: '2 years' }
    })
    readonly attribute?: Map<string, string>;
}