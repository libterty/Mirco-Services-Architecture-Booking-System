import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './books.entity';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getAllBooks(
    @Query() createBookDto: CreateBookDto,
  ): Promise<{ statusCode: string; books: Book }> {
    return this.booksService.getBooks(createBookDto);
  }

  @Post()
  createBook(
    @Body() createBookDto: CreateBookDto,
  ): Promise<{ statusCode: string; book: Book }> {
    return this.booksService.createBook(createBookDto);
  }
}
