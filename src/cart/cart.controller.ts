import { Body, Controller, Param, Post, Get, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { CartDTO } from './DTO/cart.dto';
import { CartService } from './cart.service';
import { Cart } from './Models/cart.model';
import { CartItemDTO } from './DTO/cartItem.dto';
import { UpdateCartDTO } from './DTO/cart.update.dto';
import { AuthGuard } from '../Guards/authentication.guard';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';


@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
    constructor(private readonly cartService: CartService) { }
    @Post()
    @ApiOperation({ summary: "Create a new cart" })
    @ApiBody({ type: CartDTO })
    @ApiResponse({ status: 201, description: "The cart has been successfully created", type: Cart })
    @ApiResponse({ status: 400, description: "Bad Request" })
    async createCart(@Req() req: Request, @Body() cartDTO: CartDTO): Promise<Cart> {
        return await this.cartService.createCart(cartDTO);
    }

    @Post(':userId/item')
    @ApiOperation({ summary: "Add an item to a user's cart" })
    @ApiParam({ name: 'userId', description: "The ID of the user" })
    @ApiBody({ type: CartItemDTO })
    @ApiResponse({ status: 201, description: "The item has been successfully added to the cart" })
    @ApiResponse({ status: 400, description: "Bad request" })
    async addItemToCart(@Param('userId') userId: string, @Body() cartItemDTO: CartItemDTO): Promise<Cart> {
        return await this.cartService.addItemToCart(userId, cartItemDTO);
    }

    @Get(':userId')
    @ApiOperation({ summary: "Get the cart of a user" })
    @ApiParam({ name: 'userId', description: "The ID of the user" })
    @ApiResponse({ status: 200, description: "The user's cart has been successfully retrieved", type: Cart })
    @ApiResponse({ status: 404, description: "Cart not found" })
    async getCart(@Param('userId') userId: string): Promise<Cart> {
        return await this.cartService.getCart(userId);
    }

    @Put(':userId')
    @ApiOperation({ summary: "Update the cart of a user" })
    @ApiParam({ name: 'userId', description: "The ID of the user" })
    @ApiBody({ type: UpdateCartDTO })
    @ApiResponse({ status: 200, description: "The user's cart has been successfully updated" })
    @ApiResponse({ status: 404, description: "Cart not found" })
    async updateCart(@Param('userId') userId: string, @Body() updateCartDTO: UpdateCartDTO): Promise<Cart> {
        return await this.cartService.updateCart(userId, updateCartDTO);
    }

    @Delete(':userId/item/:productId')
    @ApiOperation({ summary: 'Remove an item from a user\'s cart' })
    @ApiParam({ name: 'userId', description: 'The ID of the user' })
    @ApiParam({ name: 'productId', description: 'The ID of the product' })
    @ApiResponse({ status: 200, description: 'The item has been successfully removed from the cart.', type: Cart })
    async removeItemFromCart(@Param('userId') userId: string, @Param('productId') productId: string): Promise<Cart> {
        return await this.cartService.removeItemFromCart(userId, productId);
    }

    @Delete(':userId')
    @ApiOperation({ summary: 'Clear a user\'s cart' })
    @ApiParam({ name: 'userId', description: 'The ID of the user' })
    @ApiResponse({ status: 200, description: 'The user\'s cart has been successfully cleared.', type: Cart })
    async clearCart(@Param('userId') userId: string): Promise<Cart> {
        return await this.cartService.clearCart(userId);
    }
}
