import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@/user/user.module';
import { DatabaseModule } from '@/database/database.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, DatabaseModule, AuthModule, BooksModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
