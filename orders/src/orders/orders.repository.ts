import { EntityRepository, Repository } from 'typeorm';
import { Order } from './orders.entity';
import { OrdersCreateDto } from './dto/orders.dto';
import { InternalServerErrorException, Body } from '@nestjs/common';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  async getOrderById(id: number): Promise<Order> {
    let order;
    try {
      order = await Order.find({ where: { id } });
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
    return order;
  }

  async getOrderByUserId(userId: number): Promise<Order> {
    const query = this.createQueryBuilder(
      'order',
    ).where('order.userId = :userId', { userId });
    let orders;
    try {
      orders = await query.getMany();
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
    return orders;
  }

  async createOrder(
    userId: number,
    bookId: number,
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

  async updateOrderById(
    id: number,
    ordersCreateDto: OrdersCreateDto,
  ): Promise<Order> {
    const { quantity, amount } = ordersCreateDto;
    const order = await Order.findOne({ where: { id } });
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
