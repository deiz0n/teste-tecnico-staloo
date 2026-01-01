import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { GetAllClassesService } from '../../../src/class/application/services/get-all-classes.service';
import { ClassRepositoryPort } from '../../../src/class/application/ports/out/class.repository.port';
import { ClassModel } from '../../../src/class/domain/class.model';

describe('GetAllClassesService', () => {
  let service: GetAllClassesService;

  const mockRepository = {
    getAllClasses: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetAllClassesService,
        {
          provide: ClassRepositoryPort,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GetAllClassesService>(GetAllClassesService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should return all classes when classes exist', async () => {
      const mockClasses: ClassModel[] = [
        new ClassModel(randomUUID(), 'Turma A', 'Sala 101'),
        new ClassModel(randomUUID(), 'Turma B', 'Sala 102'),
        new ClassModel(randomUUID(), 'Turma C', 'Sala 103'),
      ];

      mockRepository.getAllClasses.mockResolvedValue(mockClasses);

      const result = await service.execute();

      expect(mockRepository.getAllClasses).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockClasses);
      expect(result).toHaveLength(3);
    });

    it('should return empty array when no classes exist', async () => {
      mockRepository.getAllClasses.mockResolvedValue([]);

      const result = await service.execute();

      expect(mockRepository.getAllClasses).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });

    it('should throw error if repository fails', async () => {
      const error = new Error('Database connection failed');
      mockRepository.getAllClasses.mockRejectedValue(error);

      await expect(service.execute()).rejects.toThrow(error);
    });
  });
});
