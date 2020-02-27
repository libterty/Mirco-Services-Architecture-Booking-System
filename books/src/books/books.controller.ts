import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
  Query,
  Param,
  ParseIntPipe,
  Put,
  Delete,
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

  @Get('/:id')
  getBookById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ statusCode: string; book: Book }> {
    return this.booksService.getBookById(id);
  }

  @Post()
  createBook(
    @Body() createBookDto: CreateBookDto,
  ): Promise<{ statusCode: string; book: Book }> {
    return this.booksService.createBook(createBookDto);
  }

  @Put('/:id')
  updateBookById(
    @Param('id', ParseIntPipe) id: number,
    @Body() createBookDto: CreateBookDto,
  ): Promise<{ statusCode: string; book: Book }> {
    return this.booksService.updateBookById(id, createBookDto);
  }

  @Delete('/:id')
  deleteBookById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ statusCode: string }> {
    return this.booksService.deleteBookById(id);
  }
}
