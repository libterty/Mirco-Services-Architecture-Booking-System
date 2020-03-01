import { Request, Response, NextFunction } from 'express';
import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { OrdersCreateDto } from './dto/orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    private orderService: OrdersService,
    private readonly authService: AuthService,
  ) {}

  getOrder(token: string): Promise<object> {
    return new Promise<object>(resolve => {
      resolve(this.authService.validate(token));
    });
  }

  @Post('/:userId/:bookId')
  async createOrder(
    @Req() request: Request,
    @Param('userId', ParseIntPipe) userId: number,
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() ordersCreateDto: OrdersCreateDto,
  ) {
    const result = await this.getOrder(request.headers.authorization);
    if (result) {
      return this.orderService.createOrder(userId, bookId, ordersCreateDto);
    }
  }
}
