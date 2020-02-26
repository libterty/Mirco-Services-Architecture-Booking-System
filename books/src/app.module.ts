import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/books';

@Module({
  imports: [
    BooksModule,
    MongooseModule.forRoot(MONGODB_URI, {
      connectionName: 'books',
      useNewUrlParser: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }),
  ],
})
export class AppModule {}
