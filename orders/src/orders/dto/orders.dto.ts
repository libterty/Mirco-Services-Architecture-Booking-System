import { IsNumber, IsNotEmpty, Min } from 'class-validator';

export class OrdersCreateDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;
}
