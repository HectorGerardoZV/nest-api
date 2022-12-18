import "reflect-metadata";
import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from "./transform.interceptor";
import { Logger } from "@nestjs/common";


async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  const port: string = process.env.SERVER_PORT;
  await app.listen(port, () => {
    logger.log(`Server running in port ${port}`);
  });
}
bootstrap();
