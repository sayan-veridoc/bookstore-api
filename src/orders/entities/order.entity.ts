import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { User as UserEntity } from '@/users/entities/user.entity';
import { Book } from '@/books/entities/book.entity';
import type { User } from '@/users/entities/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalPrice: string;

  @ManyToOne(() => UserEntity, (user) => user.orders, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToMany(() => Book, (book) => book.orders)
  @JoinTable()
  books: Book[];

  constructor(partial: Partial<Order>) {
    Object.assign(this, partial);
  }
}
