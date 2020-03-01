import { EntityRepository, Repository } from 'typeorm';
import { Order } from './orders.entity';
import { OrdersCreateDto } from './dto/orders.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async createOrder(
    userId,
    bookId,
    ordersCreateDto: OrdersCreateDto,
  ): Promise<Order> {
    const { quantity, amount } = ordersCreateDto;

    const order = new Order();
    order.userId = userId;
    order.bookId = bookId;
    order.quantity = quantity;
    order.amount = amount;

    try {
      await order.save();
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
    return order;
  }
}
