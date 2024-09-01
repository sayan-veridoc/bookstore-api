import { Category } from '@/category/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  author: string;

  @ManyToOne(() => Category, (category) => category.books, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  category: Category;

  constructor(partial: Partial<Book>) {
    Object.assign(this, partial);
  }
}
