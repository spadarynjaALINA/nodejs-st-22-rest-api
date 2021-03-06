import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(PORT ?? 3000);
}
bootstrap();
