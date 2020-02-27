import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly author: string;

  readonly numberPages: number;

  readonly publisher: string;
}
