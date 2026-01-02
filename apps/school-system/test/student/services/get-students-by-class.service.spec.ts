import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { GetStudentsByClassService } from '../../../src/student/application/services/get-students-by-class.service';
import { StudentRepositoryPort } from '../../../src/student/application/ports/out/student.repository.port';
import { StudentModel } from '../../../src/student/domain/student.model';

describe('GetStudentsByClassService', () => {
  let service: GetStudentsByClassService;

  const mockRepository = {
    getStudentsByClass: jest.fn(),
    getStudentById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetStudentsByClassService,
        {
          provide: StudentRepositoryPort,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GetStudentsByClassService>(GetStudentsByClassService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const classId = randomUUID();

    it('should return students when class has students', async () => {
      const mockStudents: StudentModel[] = [
        new StudentModel(
          randomUUID(),
          'John Doe',
          '12345678900',
          'Rua A, 123',
          new Date('2000-01-01'),
        ),
        new StudentModel(
          randomUUID(),
          'Jane Doe',
          '98765432100',
          'Rua B, 456',
          new Date('1999-05-15'),
        ),
      ];

      mockRepository.getStudentsByClass.mockResolvedValue(mockStudents);

      const result = await service.execute(classId);

      expect(mockRepository.getStudentsByClass).toHaveBeenCalledWith(classId);
      expect(mockRepository.getStudentsByClass).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockStudents);
      expect(result).toHaveLength(2);
    });

    it('should return empty array when class has no students', async () => {
      mockRepository.getStudentsByClass.mockResolvedValue([]);

      const result = await service.execute(classId);

      expect(mockRepository.getStudentsByClass).toHaveBeenCalledWith(classId);
      expect(result).toEqual([]);
    });

    it('should throw error if repository fails', async () => {
      const error = new Error('Database connection failed');
      mockRepository.getStudentsByClass.mockRejectedValue(error);

      await expect(service.execute(classId)).rejects.toThrow(error);
    });
  });
});
