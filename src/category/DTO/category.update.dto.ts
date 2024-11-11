import { PartialType } from "@nestjs/mapped-types";
import { CreateCategoryDTO } from "./category.create.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateCategoryDTO extends PartialType(CreateCategoryDTO) {
    @ApiProperty({
        description: 'The name of the category. This field is optional.',
        example: 'Home Appliances',
        required: false,
    })
    readonly name?: string;
}