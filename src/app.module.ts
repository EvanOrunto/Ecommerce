import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './Users/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'
import { ProductsModule } from './products/products.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import paystackConfig from './config/paystack.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [paystackConfig] }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    UsersModule,
    AuthModule,
    ProductsModule,
    CategoryModule,
    CartModule,
    OrdersModule,
    PaymentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
