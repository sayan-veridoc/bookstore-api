import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { CategoryModule } from '@/category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), CategoryModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
