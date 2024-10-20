import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/Users/DTO/user.create.dto';
import { LoginUserDTO } from 'src/Users/DTO/loginUser.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/register')
    register(@Body() createUserDTO: CreateUserDTO): Promise<{ token: string }> {
        return this.authService.register(createUserDTO);
    }

    @Get('/login')
    login(@Body() loginUserDTO: LoginUserDTO): Promise<{ token: string }> {
        return this.authService.login(loginUserDTO);
    }
}
