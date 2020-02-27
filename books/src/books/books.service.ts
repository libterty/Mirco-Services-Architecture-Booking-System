import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './books.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './books.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository) private bookRepository: BookRepository,
  ) {}

  async createBook(
    createBookDto: CreateBookDto,
  ): Promise<{ statusCode: string; book: Book }> {
    const book = await this.bookRepository.createBook(createBookDto);
    if (!book) {
      throw new NotFoundException(
        `Task with query "${createBookDto}" not found`,
      );
    }
    return { statusCode: '200', book };
  }
}
