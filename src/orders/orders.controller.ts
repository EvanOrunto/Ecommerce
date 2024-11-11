import { Controller, Post, Body, Get, Param, Put, UseGuards, Delete } from '@nestjs/common';
import { Order } from './model/order.model';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './DTO/createOrder.dto';
import { UpdateOrderDTO } from './DTO/updateOrder.dto';
import { AuthGuard } from 'src/Guards/authentication.guard';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
    constructor(private readonly orderService: OrdersService) { }
    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201, description: 'The order has been successfully created.', type: Order })
    @ApiResponse({ status: 400, description: "Bad request" })
    @ApiBody({ type: CreateOrderDTO })
    async createOrder(@Body() createOrderDTO: CreateOrderDTO): Promise<Order> {
        return await this.orderService.createOrder(createOrderDTO);
    }

    @Get(':userId')
    @ApiOperation({ summary: 'Get all orders for a user' })
    @ApiParam({ name: 'userId', description: 'The ID of the user', type: String })
    @ApiResponse({ status: 200, description: 'Return all orders for the user', type: [Order] })
    async findAllOrders(@Param('cart') userId: string): Promise<Order[]> {
        return await this.orderService.findAllOrders(userId);
    }

    @Get(':orderId')
    @ApiOperation({ summary: 'Get an order by ID' })
    @ApiParam({ name: 'orderId', description: 'The ID of the order', type: String })
    @ApiResponse({ status: 200, description: 'Return the order with the specified ID', type: Order })
    @ApiResponse({ status: 404, description: "Order not found" })
    async findById(@Param('orderId') orderId: string): Promise<Order> {
        return await this.orderService.findById(orderId);
    }

    @Put(':orderId/status')
    @ApiOperation({ summary: 'Update the status of an order' })
    @ApiParam({ name: 'orderId', description: 'The ID of the order', type: String })
    @ApiResponse({ status: 200, description: 'The order status has been successfully updated.', type: Order })
    async updateOrderStatus(@Param('orderId') orderId: string, @Body() updateStatusOrderDTO: UpdateOrderDTO) {
        return await this.orderService.updateOrderStatus(orderId, updateStatusOrderDTO);
    }

    @Delete(':orderId')
    @ApiOperation({ summary: 'Delete an order by ID' })
    @ApiParam({ name: 'orderId', description: 'The ID of the order', type: String })
    @ApiResponse({ status: 200, description: 'The order has been successfully deleted', type: Order })
    @ApiResponse({ status: 404, description: "Order not found" })
    async deleteOrder(@Param('orderId') orderId: string): Promise<Order> {
        return await this.orderService.deleteOrder(orderId);
    }
}
