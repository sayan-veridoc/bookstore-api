import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UsersModule } from '@/users/users.module';
import { BooksModule } from '@/books/books.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), UsersModule, BooksModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
