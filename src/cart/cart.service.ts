import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './Models/cart.model';
import mongoose, { Model } from 'mongoose';
import { CartDTO } from './DTO/cart.dto';
import { CartItemDTO } from './DTO/cartItem.dto';
import { UpdateCartDTO } from './DTO/cart.update.dto';
import { Product } from 'src/products/Model/products.model';

@Injectable()
export class CartService {
    constructor(@InjectModel(Cart.name) private readonly cartModel: Model<Cart>) { }

    async getCart(userId: string): Promise<Cart> {
        const cart = await this.cartModel.findOne({ userId }).populate('items.productId').populate({ path: 'userId', select: 'name' }).exec();

        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
        return cart;
    }

    async createCart(cartDTO: CartDTO): Promise<Cart> {
        const createdCart = await new this.cartModel(cartDTO).populate('items.productId');
        return createdCart.save();
    }

    async updateCart(userId: string, updateCartDTO: UpdateCartDTO): Promise<Cart> {
        const cart = await this.cartModel.findOneAndUpdate({ userId }, updateCartDTO, { new: true }).exec();
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        return cart;
    }

    async addItemToCart(userId: string, cartItemDTO: CartItemDTO): Promise<Cart> {
        const cart = await this.cartModel.findOne({ userId }).exec();
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === cartItemDTO.productId.toString());
        if (existingItemIndex > -1) {
            cart.items[existingItemIndex].quantity += cartItemDTO.quantity;
        } else {
            cart.items.push(cartItemDTO);
        }

        return cart.save();
    }

    async removeItemFromCart(userId: string, productId: string): Promise<Cart> {
        const cart = await this.cartModel.findOne({ userId }).exec();
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        return cart.save();
    }

    async clearCart(userId: string): Promise<Cart> {
        const cart = await this.cartModel.findOne({ userId }).exec();
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        cart.items = [];
        return cart.save();
    }

}
