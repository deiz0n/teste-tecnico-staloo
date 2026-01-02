import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { ClassController } from '../../../src/class/infrastructure/adapters/in/web/class.controller';
import { GetAllClassesUseCase } from '../../../src/class/application/ports/in/get-all-classes.use-case';
import { ClassModel } from '../../../src/class/domain/class.model';

describe('ClassController', () => {
  let controller: ClassController;

  const mockGetAllClassesUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassController],
      providers: [
        {
          provide: GetAllClassesUseCase,
          useValue: mockGetAllClassesUseCase,
        },
      ],
    }).compile();

    controller = module.get<ClassController>(ClassController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should call the use case and return all classes', async () => {
      const mockClasses: ClassModel[] = [
        new ClassModel(randomUUID(), 'Turma A', 'Sala 101'),
        new ClassModel(randomUUID(), 'Turma B', 'Sala 102'),
      ];

      mockGetAllClassesUseCase.execute.mockResolvedValue(mockClasses);

      const result = await controller.getAll();

      expect(mockGetAllClassesUseCase.execute).toHaveBeenCalledTimes(1);

      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('data');
      expect(result.data).toEqual(mockClasses);
    });

    it('should return empty array when no classes exist', async () => {
      mockGetAllClassesUseCase.execute.mockResolvedValue([]);

      const result = await controller.getAll();

      expect(result).toHaveProperty('timestamp');
      expect(result.data).toEqual([]);
    });

    it('should propagate errors from the use case', async () => {
      const error = new Error('Unexpected error');
      mockGetAllClassesUseCase.execute.mockRejectedValue(error);

      await expect(controller.getAll()).rejects.toThrow(error);
    });

    it('should return response with valid ISO timestamp', async () => {
      mockGetAllClassesUseCase.execute.mockResolvedValue([]);

      const result = await controller.getAll();

      expect(result.timestamp).toBeDefined();
      expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
    });
  });
});
