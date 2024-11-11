import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { CustomUnAuthorizedException } from "../Guards/authentication.guard";
import { Request, Response } from 'express';


@Catch(CustomUnAuthorizedException)
export class UnAuthorizedExceptionFilter implements ExceptionFilter {
    catch(exception: CustomUnAuthorizedException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        const errorResponse = {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: exception.message,
            path: request.url
        }

        response.status(HttpStatus.UNAUTHORIZED).json(errorResponse);
    }

}
