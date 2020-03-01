import { IsNumber, IsNotEmpty, Min } from 'class-validator';

export class OrdersCreateDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: string;
}
