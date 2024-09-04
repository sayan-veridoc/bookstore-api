import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Book } from '@/books/entities/book.entity';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Book]), UserModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
