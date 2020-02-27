import { EntityRepository, Repository, Not, MoreThan } from 'typeorm';
import { Book } from './books.entity';
import { CreateBookDto } from './dto/create-book.dto';
import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async getBooks(createBookDto: CreateBookDto): Promise<Book> {
    const { title, author, numberPages, publisher } = createBookDto;
    const query = this.createQueryBuilder('book');
    let books;
    if (title) {
      query.andWhere('book.title = :title', { title });
    }
    if (author) {
      query.andWhere('book.author = :author', { author });
    }
    if (publisher) {
      query.andWhere('book.publisher = :publisher', { publisher });
    }
    if (numberPages) {
      query.andWhere('book.numberPages <= :numberPages', { numberPages });
    }

    try {
      books = await query.getMany();
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
    return books;
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { title, author, numberPages, publisher } = createBookDto;

    const isExist = await Book.findOne({ title });

    if (isExist) {
      throw new ConflictException(`${title} exist`);
    } else {
      const book = new Book();
      book.title = title;
      book.author = author;
      book.numberPages = numberPages;
      book.publisher = publisher;
      try {
        await book.save();
      } catch (error) {
        throw new InternalServerErrorException(`${error}`);
      }
      return book;
    }
  }

  async updateBookById(
    id: number,
    createBookDto: CreateBookDto,
  ): Promise<Book> {
    const { title, author, numberPages, publisher } = createBookDto;

    const book = await Book.findOne({ where: { id } });
    book.title = title ? title : book.title;
    book.author = author ? author : book.author;
    book.numberPages = numberPages ? numberPages : book.numberPages;
    book.publisher = publisher ? publisher : book.publisher;

    try {
      await book.save();
    } catch (error) {
      throw new InternalServerErrorException(`${error}`);
    }
    return book;
  }
}
