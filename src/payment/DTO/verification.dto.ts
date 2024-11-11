import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class VerificationDTO {
    @ApiProperty({
        description: 'The reference code to verify the payment.',
        example: 'ABC123XYZ',
    })
    @IsString()
    @IsNotEmpty()
    reference: string;
}