import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';
import { User } from '@/user/entities/user.entity';
import { Book } from '@/books/entities/book.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalPrice: string;

  @ManyToMany(() => Book, (book) => book.orders, { eager: true })
  @JoinTable()
  books: Book[];

  @ManyToOne(() => User, (user) => user.orders, { lazy: true, eager: false })
  user: Promise<User>;

  constructor(partial: Partial<Order>) {
    Object.assign(this, partial);
  }
}
