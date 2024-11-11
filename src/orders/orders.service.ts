import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './model/order.model';
import { Model } from 'mongoose';
import { CreateOrderDTO } from './DTO/createOrder.dto';
import { UpdateOrderDTO } from './DTO/updateOrder.dto';
import { Cart } from 'src/cart/Models/cart.model';
import { Product, ProductDocument } from 'src/products/Model/products.model';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name) private readonly orderModel: Model<Order>,
        @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
        @InjectModel(Product.name) private readonly productModel: Model<Product>
    ) { }

    async createOrder(createOrderDTO: CreateOrderDTO): Promise<Order> {
        const cart = await this.cartModel.findById(createOrderDTO.cart).populate({ path: 'items.productId', model: this.productModel }).exec();

        if (!cart) {
            throw new NotFoundException('Cart not Found');
        }

        let totalAmount = 0;

        cart.items.forEach((item) => {
            const product = item.productId as unknown as ProductDocument;
            totalAmount += product.price * item.quantity;
        })

        const newOrder = await new this.orderModel({ ...createOrderDTO, totalAmount }).populate({ path: 'cart', populate: { path: 'items.productId', model: 'Product' } });
        return newOrder.save();
    }

    async findAllOrders(userId: string): Promise<Order[]> {
        const orders = await this.orderModel.find({ 'cart.userId': userId }).populate({ path: 'cart', populate: { path: 'items.productId', model: 'Product' } }).exec();
        if (!orders) {
            throw new NotFoundException(`Order with this cart id:${userId} does not exist`);
        }

        return orders;
    }

    async findById(orderId: string): Promise<Order> {
        const order = await this.orderModel.findById(orderId).populate({ path: 'cart', populate: { path: 'items.productId', model: 'Product' } }).exec();
        if (!order) {
            throw new NotFoundException(`Order of this id: ${orderId} does not exist`);
        }

        return order;
    }

    async updateOrderStatus(orderId: string, updateStatusOrderDTO: UpdateOrderDTO): Promise<Order> {
        const order = await this.orderModel.findByIdAndUpdate(orderId, { status: updateStatusOrderDTO.status }, { new: true }).exec();
        if (!order) {
            throw new NotFoundException(`Order with this id:${orderId} does not exist`);
        }

        return order;
    }

    async deleteOrder(orderId: string): Promise<Order> {
        const order = await this.orderModel.findByIdAndDelete(orderId).exec();
        if (!order) {
            throw new NotFoundException(`Order with this id:${orderId} does not exist`)
        }

        return order;
    }
}
