import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [BooksModule, TypeOrmModule.forRoot(typeOrmConfig)],
})
export class AppModule {}
