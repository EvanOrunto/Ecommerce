import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../Users/Model/user.model';
import { Model } from 'mongoose';
import { CreateUserDTO } from '../Users/DTO/user.create.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO } from 'src/Users/DTO/loginUser.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>, private jwtService: JwtService) { }

    async register(createUserDTO: CreateUserDTO): Promise<{ token: string }> {
        const { email, password, name } = createUserDTO;
        const existingUser = await this.userModel.findOne({ email });

        if (existingUser) {
            throw new UnauthorizedException("Email has already been used");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({
            name,
            email,
            password: hashedPassword
        });

        const token = this.jwtService.sign({ id: user._id });
        await user.save();
        return { token };
    }

    async login(loginUserDTO: LoginUserDTO): Promise<{ token: string }> {
        const { email, password } = loginUserDTO;

        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new UnauthorizedException("Inavalid email or Password");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            throw new UnauthorizedException("Invalid email and Password");
        }

        const token = this.jwtService.sign({ id: user._id });
        return { token };
    }
}
