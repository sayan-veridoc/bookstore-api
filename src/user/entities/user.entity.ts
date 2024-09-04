import { Order } from '@/orders/entities/order.entity';
import { Exclude } from 'class-transformer';
import { Role } from 'src/enum/roles.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: Role, default: Role.Admin })
  roles: Role;

  @Column({ nullable: true })
  @Exclude()
  password?: string;

  @Column({ nullable: true })
  @Exclude()
  phone_no?: string;

  @Column({ nullable: true })
  @Exclude()
  resetToken?: string;

  @Column({ nullable: true })
  @Exclude()
  resetTokenTime?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
