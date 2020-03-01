import { EntityRepository, Repository } from 'typeorm';
import { Order } from './orders.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {}
