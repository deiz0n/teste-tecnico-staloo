import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceNotesService {
  getHello(): string {
    return 'Hello World!';
  }
}
