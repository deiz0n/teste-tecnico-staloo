import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  const config = app.get(ConfigService);
  const port = config.get<number>('SERVICE_NOTES_PORT');

  await app.listen(3000);

  logger.log(
    `Microservice Service Notes is running in http://localhost:${port}`,
  );
}
bootstrap();
