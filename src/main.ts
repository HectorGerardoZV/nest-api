import "reflect-metadata";
import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from "./transform.interceptor";
import { Logger } from "@nestjs/common";


async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  const port: string = '3000';
  const host: string = 'localhost';
  await app.listen(port, host, () => {
    logger.log(`Server running in ${host}:${port}`);
  });
}
bootstrap();
