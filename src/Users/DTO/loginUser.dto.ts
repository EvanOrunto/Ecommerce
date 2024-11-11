import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDTO {
    @ApiProperty({
        description: 'User email address',
        example: 'user@gmail.com'
    })
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty({
        description: 'User password',
        example: 'password123',
        minLength: 6
    })
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    readonly password: string;
}