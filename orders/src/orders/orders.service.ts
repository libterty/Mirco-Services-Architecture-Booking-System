import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderRepository } from './orders.repository';
import { OrdersCreateDto } from './dto/orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository) private orderRepository: OrderRepository,
  ) {}

  async createOrder(
    userId,
    bookId,
    ordersCreateDto: OrdersCreateDto,
  ): Promise<object> {
    const order = await this.orderRepository.createOrder(
      userId,
      bookId,
      ordersCreateDto,
    );
    if (!order) {
      throw new NotFoundException(`Order with Id: ${bookId} not create`);
    }
    return { statusCode: '201', order };
  }
}
