import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
import { StudentController } from '../../../src/student/infrastructure/adapters/in/web/student.controller';
import { GetStudentsByClassUseCase } from '../../../src/student/application/ports/in/get-students-by-class.use-case';
import { GetStudentReportCardUseCase } from '../../../src/student/application/ports/in/get-student-report-card.use-case';
import { StudentModel } from '../../../src/student/domain/student.model';
import { AcademicRecordDto } from '../../../src/student/domain/dto/academic-record.dto';

describe('StudentController', () => {
  let controller: StudentController;

  const mockGetStudentsByClassUseCase = {
    execute: jest.fn(),
  };

  const mockGetStudentReportCardUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: GetStudentsByClassUseCase,
          useValue: mockGetStudentsByClassUseCase,
        },
        {
          provide: GetStudentReportCardUseCase,
          useValue: mockGetStudentReportCardUseCase,
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getByClass', () => {
    const classId = randomUUID();

    it('should call the use case with correct params and return students', async () => {
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

      mockGetStudentsByClassUseCase.execute.mockResolvedValue(mockStudents);

      const result = await controller.getByClass(classId);

      expect(mockGetStudentsByClassUseCase.execute).toHaveBeenCalledWith(
        classId,
      );
      expect(mockGetStudentsByClassUseCase.execute).toHaveBeenCalledTimes(1);

      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('data');
      expect(result.data).toEqual(mockStudents);
    });

    it('should return empty array when no students found', async () => {
      mockGetStudentsByClassUseCase.execute.mockResolvedValue([]);

      const result = await controller.getByClass(classId);

      expect(result.data).toEqual([]);
      expect(result).toHaveProperty('timestamp');
    });

    it('should propagate errors from the use case', async () => {
      const error = new Error('Unexpected error');
      mockGetStudentsByClassUseCase.execute.mockRejectedValue(error);

      await expect(controller.getByClass(classId)).rejects.toThrow(error);
    });
  });

  describe('generateReportCard', () => {
    const studentId = randomUUID();

    it('should call the use case with correct params and return report card', async () => {
      const mockReportCard = new AcademicRecordDto('John Doe', [
        {
          subjects: [
            {
              name: 'Matemática',
              workload: 60,
              exams: [{ id: randomUUID(), date: new Date(), score: 10 }],
            },
          ],
          finalGrade: 8.5,
          passed: true,
        },
      ]);

      mockGetStudentReportCardUseCase.execute.mockResolvedValue(mockReportCard);

      const result = await controller.generateReportCard(studentId);

      expect(mockGetStudentReportCardUseCase.execute).toHaveBeenCalledWith(
        studentId,
      );
      expect(mockGetStudentReportCardUseCase.execute).toHaveBeenCalledTimes(1);

      expect(result).toHaveProperty('timestamp');
      expect(result).toHaveProperty('date');
      expect(result.date).toEqual(mockReportCard);
    });

    it('should propagate errors from the use case', async () => {
      const error = new Error('Student not found');
      mockGetStudentReportCardUseCase.execute.mockRejectedValue(error);

      await expect(controller.generateReportCard(studentId)).rejects.toThrow(
        error,
      );
    });
  });
});
