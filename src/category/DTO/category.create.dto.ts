import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDTO {
    @ApiProperty({
        description: 'The name of the category.',
        example: 'Electronics',
    })
    @IsNotEmpty()
    @IsString()
    readonly name: string;
}