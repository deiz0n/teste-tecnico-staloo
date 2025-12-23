import { Test, TestingModule } from '@nestjs/testing';
import { ServiceNotesController } from './service-notes.controller';
import { ServiceNotesService } from './service-notes.service';

describe('ServiceNotesController', () => {
  let serviceNotesController: ServiceNotesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceNotesController],
      providers: [ServiceNotesService],
    }).compile();

    serviceNotesController = app.get<ServiceNotesController>(ServiceNotesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceNotesController.getHello()).toBe('Hello World!');
    });
  });
});
