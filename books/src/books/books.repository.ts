import { EntityRepository, Repository } from 'typeorm';
import { Book } from './books.entity';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {}
