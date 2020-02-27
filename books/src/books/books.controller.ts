import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './books.entity';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  createBook(
    @Body() createBookDto: CreateBookDto,
  ): Promise<{ statusCode: string; book: Book }> {
    return this.booksService.createBook(createBookDto);
  }
}
