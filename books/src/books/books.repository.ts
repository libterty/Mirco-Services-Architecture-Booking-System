import { EntityRepository, Repository } from 'typeorm';
import { Book } from './books.entity';
import { CreateBookDto } from './dto/create-book.dto';
import {
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const { title, author, numberPages, publisher } = createBookDto;

    const isExist = await Book.findOneOrFail({ title, author });

    if (isExist) {
      throw new ConflictException(`${title} or ${author} exist`);
    }

    const book = new Book();
    book.title = title;
    book.author = author;
    book.numberPages = numberPages;
    book.publisher = publisher;
    try {
      await book.save();
    } catch (error) {
      throw new InternalServerErrorException(`${error.message}`);
    }
    return book;
  }
}
