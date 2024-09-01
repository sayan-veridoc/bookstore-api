import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@/user/user.module';
import { DatabaseModule } from '@/database/database.module';
import { AuthModule } from '@/auth/auth.module';
import { BooksModule } from '@/books/books.module';
import { CategoryModule } from '@/category/category.module';
import { HealthModule } from '@/health/health.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    DatabaseModule,
    AuthModule,
    BooksModule,
    CategoryModule,
    HealthModule,
    FirebaseModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
