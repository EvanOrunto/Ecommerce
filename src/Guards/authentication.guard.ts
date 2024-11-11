import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const token = this.extractTokenFromHeader(request.headers['authorization']);

        if (!token) {
            throw new UnauthorizedException("Authorization header or Token is missing");
        }

        try {
            const payload = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
            request['user'] = payload;
            return true;
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                throw new CustomUnAuthorizedException("Token has expired");
            } else {
                throw new CustomUnAuthorizedException('Invalid token');
            }
        }
    }

    private extractTokenFromHeader(authHeader: string): string | null {
        if (!authHeader) return null;

        const [, token] = authHeader.split(' ');
        return token.trim();
    }
}

export class CustomUnAuthorizedException extends UnauthorizedException {
    constructor(message: string) {
        super(message);
    }
}