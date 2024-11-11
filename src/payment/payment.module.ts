import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './Model/transaction.model';
import { User } from '../Users/Model/user.model';
import { UserSchema } from '../Users/Model/user.model';
import { JwtService } from '@nestjs/jwt';
import { Order, OrderSchema } from 'src/orders/model/order.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }, { name: User.name, schema: UserSchema }, { name: Order.name, schema: OrderSchema }])],
  providers: [PaymentService, JwtService],
  controllers: [PaymentController]
})
export class PaymentModule { }
