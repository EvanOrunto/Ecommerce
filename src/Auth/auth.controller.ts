import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/Users/DTO/user.create.dto';
import { LoginUserDTO } from 'src/Users/DTO/loginUser.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully registered' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiBody({ type: CreateUserDTO })
    @Post('/register')
    register(@Body() createUserDTO: CreateUserDTO): Promise<{ token: string }> {
        return this.authService.register(createUserDTO);
    }

    @ApiOperation({ summary: 'Log in an existing user' })
    @ApiResponse({ status: 200, description: 'The user has been successfully logged in' })
    @ApiResponse({ status: 401, description: 'Unauthorized. ' })
    @ApiBody({ type: LoginUserDTO })
    @Post('/login')
    login(@Body() loginUserDTO: LoginUserDTO): Promise<{ token: string }> {
        return this.authService.login(loginUserDTO);
    }
}
