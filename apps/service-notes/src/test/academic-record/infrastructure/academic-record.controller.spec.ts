import { TestingModule, Test } from '@nestjs/testing';
import { GetStudentReportCardUseCase } from '../../../academic-record/application/ports/in/get-student-report-card.use-case';
import { AcademicRecordModel } from '../../../academic-record/domain/academic-record.model';
import { AcademicRecordController } from '../../../academic-record/infrastructure/adapters/in/academic-record.controller';
import { randomUUID } from 'crypto';

describe('AcademicRecordController', () => {
  let controller: AcademicRecordController;
  let useCase: GetStudentReportCardUseCase;

  const mockUseCase = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AcademicRecordController],
      providers: [
        {
          provide: GetStudentReportCardUseCase,
          useValue: mockUseCase,
        },
      ],
    }).compile();

    controller = module.get<AcademicRecordController>(AcademicRecordController);
    useCase = module.get<GetStudentReportCardUseCase>(
      GetStudentReportCardUseCase,
    );

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getStudentReportCard', () => {
    const studentId = randomUUID();

    it('should call the use case with correct params and return records', async () => {
      const mockResult: AcademicRecordModel[] = [
        {
          id: randomUUID(),
          studentId: studentId,
          subject: { name: 'Math', workload: 60, exams: [] } as any,
          exams: [],
          finalGrade: 8.5,
          passed: true,
          updatePerformance: jest.fn(),
        },
      ];

      mockUseCase.execute.mockResolvedValue(mockResult);

      const result = await controller.getStudentReportCard(studentId);

      expect(mockUseCase.execute).toHaveBeenCalledWith(studentId);
      expect(mockUseCase.execute).toHaveBeenCalledTimes(1);

      expect(result).toEqual(mockResult);
    });

    it('should propagate errors from the use case', async () => {
      const error = new Error('Unexpected error');
      mockUseCase.execute.mockRejectedValue(error);

      await expect(controller.getStudentReportCard(studentId)).rejects.toThrow(
        error,
      );
    });
  });
});
