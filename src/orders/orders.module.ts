import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './model/order.model';
import { Cart, CartSchema } from 'src/cart/Models/cart.model';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }, { name: Cart.name, schema: CartSchema }]), ProductsModule],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])]
})
export class OrdersModule { }
