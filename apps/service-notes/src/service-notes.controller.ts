import { Controller, Get } from '@nestjs/common';
import { ServiceNotesService } from './service-notes.service';

@Controller()
export class ServiceNotesController {
  constructor(private readonly serviceNotesService: ServiceNotesService) {}

  @Get()
  getHello(): string {
    return this.serviceNotesService.getHello();
  }
}
