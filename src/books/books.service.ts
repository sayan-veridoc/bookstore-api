import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CategoryService } from '@/category/category.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    private categoryService: CategoryService,
  ) {}
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { categoryId, ...bookData } = createBookDto;

    // Find the category
    const category = await this.categoryService.findOne(categoryId);

    // Create the book
    const book = this.bookRepository.create({
      ...bookData,
      category,
    });

    return this.bookRepository.save(book);
  }

  async findAll(): Promise<{ books: Book[] }> {
    const books = await this.bookRepository.find();
    return { books };
  }
  async findOne(id: number): Promise<Book> {
    const category = await this.bookRepository.findOne({ where: { id } });

    if (category) {
      return category;
    }

    throw new HttpException('Book does not exist.', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const { categoryId, ...updateData } = updateBookDto;
    const book = await this.findOne(id);
    const category = await this.categoryService.findOne(categoryId);

    book.category = category;
    Object.assign(book, updateData);
    return await this.bookRepository.save(book);
  }

  async remove(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
