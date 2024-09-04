import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { In, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '@/books/entities/book.entity';
import { UserService } from '@/user/user.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    private usersService: UserService,
    // private categoryService: CategoryService,
    // private firebaseService: FirebaseService,
  ) {}
  async create(userId: number, createOrderDto: CreateOrderDto) {
    const user = await this.usersService.findById(userId);

    const bookIds = createOrderDto.books.map((book) => book.bookId);
    const requestedQuantities = new Map<number, number>();

    createOrderDto.books.forEach((bookOrder) => {
      requestedQuantities.set(bookOrder.bookId, bookOrder.quantity);
    });

    const books = await this.bookRepository.find({
      where: { id: In(bookIds) },
    });

    if (books.length !== bookIds.length) {
      throw new NotFoundException('One or more books not found');
    }

    let totalPrice = 0;
    const unavailableBooks = [];

    books.forEach((book) => {
      const requestedQuantity = requestedQuantities.get(book.id);
      if (requestedQuantity > (book.quantity || 0)) {
        unavailableBooks.push({
          bookId: book.id,
          availableQuantity: book.quantity,
          requestedQuantity,
        });
      } else {
        totalPrice += parseFloat(book.price || '0') * requestedQuantity;
      }
    });

    if (unavailableBooks.length > 0) {
      throw new BadRequestException({
        message: 'Some books have insufficient stock',
        unavailableBooks,
      });
    }
    const order = this.orderRepository.create({
      user,
      books,
      totalPrice: totalPrice.toString(),
    });
    return await this.orderRepository.save(order);
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
