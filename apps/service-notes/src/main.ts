import { NestFactory } from '@nestjs/core';
import { ServiceNotesModule } from './service-notes.module';

async function bootstrap() {
  const app = await NestFactory.create(ServiceNotesModule);
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
