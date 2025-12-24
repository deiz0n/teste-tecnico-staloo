import { NestFactory } from '@nestjs/core';
import { ServiceNotesModule } from './service-notes.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ServiceNotesModule);
  const config = app.get(ConfigService);
  const port = config.get<number>('SERVICES_NOTES_PORT') || 3001;
  await app.listen(port);
}
bootstrap();
