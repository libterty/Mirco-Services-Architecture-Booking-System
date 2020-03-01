import { Request, Response, NextFunction, request } from 'express';
import {
  Controller,
  Get,
  UseGuards,
  Req,
  Post,
  Param,
  ParseIntPipe,
  Body,
  UnauthorizedException,
  Put,
  Delete,
  HttpCode,
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

  private isAuth(token: string): Promise<object> {
    return new Promise<object>(resolve => {
      resolve(this.authService.validate(token));
    });
  }

  @Get('/:id')
  async getOrderById(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<object> {
    const auth = await this.isAuth(request.headers.authorization);
    if (auth) {
      return this.orderService.getOrderById(id);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Get('/users/:userId')
  async getOrderByUserId(
    @Req() request: Request,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<object> {
    const auth = await this.isAuth(request.headers.authorization);
    if (auth) {
      return this.orderService.getOrderByUserId(userId);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Post('/:userId/:bookId')
  async createOrder(
    @Req() request: Request,
    @Param('userId', ParseIntPipe) userId: number,
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() ordersCreateDto: OrdersCreateDto,
  ): Promise<object> {
    const auth = await this.isAuth(request.headers.authorization);
    if (auth) {
      return this.orderService.createOrder(userId, bookId, ordersCreateDto);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Put('/:id')
  async updateOrderById(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() ordersCreateDto: OrdersCreateDto,
  ): Promise<object> {
    const auth = await this.isAuth(request.headers.authorization);
    if (auth) {
      return this.orderService.updateOrderById(id, ordersCreateDto);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete('/:id')
  @HttpCode(204)
  async deleteOrderById(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    const auth = await this.isAuth(request.headers.authorization);
    if (auth) {
      return this.orderService.deleteOrderById(id);
    } else {
      throw new UnauthorizedException();
    }
  }
}
