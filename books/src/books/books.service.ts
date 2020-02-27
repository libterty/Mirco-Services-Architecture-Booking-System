import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './books.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './books.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository) private bookRepository: BookRepository,
  ) {}

  async getBooks(
    createBookDto: CreateBookDto,
  ): Promise<{ statusCode: string; books: Book }> {
    const books = await this.bookRepository.getBooks(createBookDto);
    if (!books) {
      throw new NotFoundException(`Book with query ${createBookDto} not found`);
    }
    return { statusCode: '200', books };
  }

  async getBookById(id): Promise<{ statusCode: string; book: Book }> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with Id ${id} not found`);
    }
    return { statusCode: '200', book };
  }

  async createBook(
    createBookDto: CreateBookDto,
  ): Promise<{ statusCode: string; book: Book }> {
    const book = await this.bookRepository.createBook(createBookDto);
    if (!book) {
      throw new NotFoundException(
        `Task with query "${createBookDto}" not found`,
      );
    }
    return { statusCode: '201', book };
  }

  async updateBookById(
    id: number,
    createBookDto: CreateBookDto,
  ): Promise<{ statusCode: string; book: Book }> {
    const book = await this.bookRepository.updateBookById(id, createBookDto);
    if (!book) {
      throw new InternalServerErrorException(`Update Book ${id} error`);
    }
    return { statusCode: '200', book };
  }
}
