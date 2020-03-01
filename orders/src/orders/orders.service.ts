import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './orders.repository';
import { OrdersCreateDto } from './dto/orders.dto';
import { Not } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository) private orderRepository: OrderRepository,
  ) {}

  async getOrderById(id: number): Promise<object> {
    const order = await this.orderRepository.getOrderById(id);
    if (!order) {
      throw new NotFoundException(`Order with Id: ${id} cannot found`);
    }
    return { statusCode: '200', order };
  }

  async getOrderByUserId(userId: number): Promise<object> {
    console.log('userid log:', userId);
    const orders = await this.orderRepository.getOrderByUserId(userId);
    if (!orders) {
      throw new NotFoundException(`Order with UserId: ${userId} cannot found`);
    }
    return { statusCode: '200', orders };
  }

  async createOrder(
    userId: number,
    bookId: number,
    ordersCreateDto: OrdersCreateDto,
  ): Promise<object> {
    const order = await this.orderRepository.createOrder(
      userId,
      bookId,
      ordersCreateDto,
    );
    if (!order) {
      throw new NotFoundException(`Order with Book Id: ${bookId} not create`);
    }
    return { statusCode: '201', order };
  }

  async updateOrderById(
    id: number,
    ordersCreateDto: OrdersCreateDto,
  ): Promise<object> {
    const order = await this.orderRepository.updateOrderById(
      id,
      ordersCreateDto,
    );

    if (!order) {
      throw new NotFoundException(`Order with Id: ${id} cannot found`);
    }
    return { statusCode: '200', order };
  }

  async deleteOrderById(id: number): Promise<void> {
    const result = await this.orderRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Order with Id: ${id} cannot found`);
    }
    return;
  }
}
