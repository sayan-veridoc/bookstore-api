import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@/database/database.module';
import { AuthModule } from '@/auth/auth.module';
import { BooksModule } from '@/books/books.module';
import { CategoryModule } from '@/category/category.module';
import { HealthModule } from '@/health/health.module';
import { FirebaseModule } from './firebase/firebase.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UsersModule,
    BooksModule,
    CategoryModule,
    HealthModule,
    FirebaseModule,
    OrdersModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
