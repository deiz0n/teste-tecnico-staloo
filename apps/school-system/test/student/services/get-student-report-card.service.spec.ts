import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ServiceNotesClientPort } from '../../../src/student/application/ports/out/notes-service.client.port';
import { StudentRepositoryPort } from '../../../src/student/application/ports/out/student.repository.port';
import { GetStudentReportCardService } from '../../../src/student/application/services/get-student-report-card.service';
import { StudentModel } from '../../../src/student/domain/student.model';
import { AcademicRecordDto } from '../../../src/student/domain/dto/academic-record.dto';
import { ResponseServiceNotesDto } from '../../../src/student/domain/dto/response-service-notes.dto';

describe('GetStudentReportCardService', () => {
  let service: GetStudentReportCardService;
  const mockRepository = {
    getStudentById: jest.fn(),
  };

  const mockHttpClient = {
    getStudentReportCard: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetStudentReportCardService,
        {
          provide: StudentRepositoryPort,
          useValue: mockRepository,
        },
        {
          provide: ServiceNotesClientPort,
          useValue: mockHttpClient,
        },
      ],
    }).compile();

    service = module.get<GetStudentReportCardService>(
      GetStudentReportCardService,
    );

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const studentId = randomUUID();

    const mockStudent = new StudentModel(
      studentId,
      'John Doe',
      '12345678900',
      'Rua Exemplo, 123',
      new Date('2000-01-01'),
    );

    const mockExams: ResponseServiceNotesDto[] = [
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
    ];

    it('should return academic record when student exists', async () => {
      mockRepository.getStudentById.mockResolvedValue(mockStudent);
      mockHttpClient.getStudentReportCard.mockResolvedValue(mockExams);

      const result = await service.execute(studentId);

      expect(mockRepository.getStudentById).toHaveBeenCalledWith(studentId);
      expect(mockRepository.getStudentById).toHaveBeenCalledTimes(1);

      expect(mockHttpClient.getStudentReportCard).toHaveBeenCalledWith(
        studentId,
      );
      expect(mockHttpClient.getStudentReportCard).toHaveBeenCalledTimes(1);

      expect(result).toBeInstanceOf(AcademicRecordDto);
      expect(result.studantName).toBe(mockStudent.name);
      expect(result.academicRecords).toEqual(mockExams);
    });

    it('should throw NotFoundException when student does not exist', async () => {
      mockRepository.getStudentById.mockResolvedValue(null);

      await expect(service.execute(studentId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.execute(studentId)).rejects.toThrow(
        `The student with id: ${studentId} not found`,
      );

      expect(mockHttpClient.getStudentReportCard).not.toHaveBeenCalled();
    });

    it('should handle empty exams list correctly', async () => {
      mockRepository.getStudentById.mockResolvedValue(mockStudent);
      mockHttpClient.getStudentReportCard.mockResolvedValue([]);

      const result = await service.execute(studentId);

      expect(result).toBeInstanceOf(AcademicRecordDto);
      expect(result.studantName).toBe(mockStudent.name);
      expect(result.academicRecords).toEqual([]);
    });

    it('should throw error if repository fails on fetch', async () => {
      const error = new Error('Database connection failed');
      mockRepository.getStudentById.mockRejectedValue(error);

      await expect(service.execute(studentId)).rejects.toThrow(error);
    });

    it('should throw error if httpClient fails on fetch', async () => {
      mockRepository.getStudentById.mockResolvedValue(mockStudent);

      const error = new Error('External service unavailable');
      mockHttpClient.getStudentReportCard.mockRejectedValue(error);

      await expect(service.execute(studentId)).rejects.toThrow(error);
    });
  });
});
