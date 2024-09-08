import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CategoryService } from '@/category/category.service';
import { FirebaseService } from '@/firebase/firebase.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    private categoryService: CategoryService,
    private firebaseService: FirebaseService,
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
    const book = await this.bookRepository.findOne({ where: { id } });

    if (book) {
      return book;
    }

    throw new HttpException('Book does not exist.', HttpStatus.NOT_FOUND);
  }

  async findBooksByIds(ids: number[]) {
    const books = await this.bookRepository.find({ where: { id: In(ids) } });
    if (books) {
      return books;
    }
    throw new HttpException('Books does not exist.', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const { categoryId, ...updateData } = updateBookDto;
    const book = await this.findOne(id);
    const category = await this.categoryService.findOne(categoryId);

    book.category = category;
    Object.assign(book, updateData);
    return await this.bookRepository.save(book);
  }
  async uploadThumbnail(id: number, file: Express.Multer.File) {
    const book = await this.findOne(id);
    const destination = `uploads/${Date.now()}_${file.originalname}`;
    const fileUrl = await this.firebaseService.uploadFile(file, destination);
    book.thumbnailUrl = fileUrl;
    return await this.bookRepository.save(book);
  }

  async deleteThumbnail(id: number) {
    const book = await this.findOne(id);
    book.thumbnailUrl = null;
    return await this.bookRepository.save(book);
  }
  async findAllByCategory(categoryId: number): Promise<{ books: Book[] }> {
    const category = await this.categoryService.findOne(categoryId);
    const books = await this.bookRepository.find({ where: { category } });
    return { books };
  }

  async remove(id: number): Promise<object> {
    await this.findOne(id);

    try {
      await this.bookRepository.delete(id);
      return { message: `Book with ID ${id} deleted successfully` };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Failed to delete the book.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
