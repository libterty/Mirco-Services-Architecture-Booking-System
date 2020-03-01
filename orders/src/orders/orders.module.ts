import { Module, HttpModule } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './orders.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([OrderRepository])],
  controllers: [OrdersController],
  providers: [OrdersService, AuthService],
})
export class OrdersModule {}
