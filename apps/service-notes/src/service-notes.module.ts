import { Module } from '@nestjs/common';
import { ServiceNotesController } from './service-notes.controller';
import { ServiceNotesService } from './service-notes.service';

@Module({
  imports: [],
  controllers: [ServiceNotesController],
  providers: [ServiceNotesService],
})
export class ServiceNotesModule {}
