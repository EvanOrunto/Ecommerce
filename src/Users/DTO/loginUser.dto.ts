import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginUserDTO {
    @IsEmail()
    @IsNotEmpty()
    readonly email: string;

    @IsString()
    @MinLength(6)
    @IsNotEmpty()
    readonly password: string;
}