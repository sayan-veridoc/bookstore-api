import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // PORT configaration
  const port = configService.getOrThrow<number>('PORT');
  const baseUrl = configService.getOrThrow<string>('BASE_URL');

  // swagger openapi
  const swaggerPrefix = 'swagger';
  const config = new DocumentBuilder()
    .setTitle('Book Store Api')
    .setDescription('The books API description')
    .setVersion('v1.0')
    .addServer(baseUrl)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerPrefix, app, document);

  // Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  await app.listen(port);
  Logger.log(`🚀 Application is running on: ${baseUrl}`);
  Logger.log(`🌎 Swagger is running on: ${baseUrl}/${swaggerPrefix}`);
}
bootstrap();
