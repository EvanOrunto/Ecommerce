import { IsEnum, IsNotEmpty } from "class-validator";
import { OrderStatus } from "../enum/status.enum";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateOrderDTO {
    @ApiProperty({
        description: 'The status of the order',
        enum: OrderStatus,
        example: OrderStatus.PENDING
    })
    @IsEnum(OrderStatus)
    @IsNotEmpty()
    status: OrderStatus;
}