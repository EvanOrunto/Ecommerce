import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './Model/transaction.model';
import { User } from 'src/Users/Model/user.model';
import { TransactionDTO } from './DTO/transaction.dto';
import axios from 'axios';
import { Order } from '../orders/model/order.model';

@Injectable()
export class PaymentService {
    private readonly paystackSecretKey: string;
    private readonly transactionInitUrl: string;
    private readonly transactionVerifyBaseUrl: string;

    constructor(
        private readonly configService: ConfigService,
        @InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(Order.name) private readonly orderModel: Model<Order>
    ) {
        this.paystackSecretKey = this.configService.get<string>('paystack.secretKey');
        this.transactionInitUrl = this.configService.get<string>('paystack.transactionInitUrl');
        this.transactionVerifyBaseUrl = this.configService.get<string>('paystack.transactionVerifyBaseUrl');
    }

    async initializePayment(transactionDTO: TransactionDTO, userId: string): Promise<any> {
        const user = await this.userModel.findById(userId).exec();
        const order = await this.orderModel.findById(transactionDTO.orderId).exec();

        if (!user) {
            throw new BadRequestException('User not found');
        }

        if (!order) {
            throw new BadRequestException('Order not found');
        }

        const url = this.transactionInitUrl;

        const headers = {
            Authorization: `Bearer ${this.paystackSecretKey}`,
            'Content-Type': 'application/json'
        };

        const amountInKobo = Math.round(order.totalAmount * 100);

        const data = {
            email: user.email,
            amount: amountInKobo
        }

        try {
            const response = await axios.post(url, data, { headers });
            const result = response.data;

            const transaction = await new this.transactionModel({
                orderId: order._id,
                email: user.email,
                amount: amountInKobo,
                reference: result.data.reference,
                status: order.status
            });

            console.log(transaction);

            await transaction.save();
            return result;
        } catch (error) {
            console.error('Payment initialization error:', error);
            throw new BadRequestException('Payment initialization failed');
        }
    }

    async verifyPayment(reference: string): Promise<any> {
        const url = `${this.transactionVerifyBaseUrl}/${reference}`;

        const headers = {
            Authorization: `Bearer ${this.paystackSecretKey}`,
            'Content-Type': 'application/json'
        }


        try {
            const response = await axios.get(url, { headers });
            const transaction = await this.transactionModel.findOne({ reference });
            if (transaction) {
                transaction.status = response.data.data.status;
                await transaction.save();
            }
            return response.data;

        } catch (error) {
            throw new BadRequestException('Payment verification failed');
        }
    }
}