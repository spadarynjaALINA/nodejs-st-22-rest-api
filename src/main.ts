import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();

  await app.listen(PORT ?? 3000);
  process.on('unhandledRejection', (error) => {
    throw error;
  });

  process.on('uncaughtException', (error) => {
    throw error;
  });
}

bootstrap();
