import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrderDTO {
    @ApiProperty({
        description: 'The ID of the cart associated with the order',
        example: '672922e4a3e69444630f68ed'
    })
    @IsString()
    @IsNotEmpty()
    cart: string;

    @ApiProperty({
        description: 'The shipping address for the order',
        example: '123 Main St, Springfield, USA'
    })
    @IsString()
    shippingAddress: string;
}