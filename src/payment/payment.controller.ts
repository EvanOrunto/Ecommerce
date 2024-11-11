import { Controller, Post, Req, Body, Get, Param, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { TransactionDTO } from './DTO/transaction.dto';
import { AuthGuard } from '../Guards/authentication.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('payment')
@UseGuards(AuthGuard)
export class PaymentController {
    constructor(private readonly paymentService: PaymentService) { }

    @Post('initialize')
    @ApiOperation({ summary: 'Initialize a payment' })
    @ApiResponse({ status: 201, description: 'Payment initialization successful.' })
    @ApiResponse({ status: 400, description: 'Bad request, invalid data.' })
    @ApiBody({ type: TransactionDTO })
    async initializePayment(@Body() transactionDTO: TransactionDTO, @Req() request: any): Promise<any> {
        const userId = request.user.id;
        return await this.paymentService.initializePayment(transactionDTO, userId);
    }

    @Get('verify/:reference')
    @ApiOperation({ summary: 'Verify a payment using reference' })
    @ApiResponse({ status: 200, description: 'Payment verification successful.' })
    @ApiResponse({ status: 404, description: 'Payment reference not found.' })
    async verifyPayment(@Param('reference') reference: string): Promise<any> {
        return await this.paymentService.verifyPayment(reference);
    }
}

