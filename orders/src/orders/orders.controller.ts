import { Request, Response, NextFunction } from 'express';
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private orderService: OrdersService,
    private readonly authService: AuthService,
  ) {}

  @Get('/test')
  async getOrder(@Req() request: Request) {
    const result = await this.authService.validate(
      request.headers.authorization,
    );
    return result;
  }
}
