import { TestingModule, Test } from '@nestjs/testing';
import { AcademicReportRepositoryPort } from '../../../academic-record/application/ports/out/academic-report.repository.port';
import { GetStudentReportCardService } from '../../../academic-record/application/services/get-student-report.-card.service';
import { AcademicRecordModel } from '../../../academic-record/domain/academic-record.model';
import { randomUUID } from 'crypto';

describe('GetStudentReportCardService', () => {
  let service: GetStudentReportCardService;
  let repository: AcademicReportRepositoryPort;

  const mockRepository = {
    getStudentReportCard: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetStudentReportCardService,
        {
          provide: AcademicReportRepositoryPort,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<GetStudentReportCardService>(
      GetStudentReportCardService,
    );
    repository = module.get<AcademicReportRepositoryPort>(
      AcademicReportRepositoryPort,
    );

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    const studentId = randomUUID();

    it('should fetch records, update performance, and save each one', async () => {
      const updatePerformanceMock1 = jest.fn();
      const mockRecord1 = {
        updatePerformance: updatePerformanceMock1,
      } as unknown as AcademicRecordModel;

      const updatePerformanceMock2 = jest.fn();
      const mockRecord2 = {
        updatePerformance: updatePerformanceMock2,
      } as unknown as AcademicRecordModel;

      const records = [mockRecord1, mockRecord2];

      mockRepository.getStudentReportCard.mockResolvedValue(records);
      mockRepository.save.mockResolvedValue(undefined);

      const result = await service.execute(studentId);

      expect(mockRepository.getStudentReportCard).toHaveBeenCalledWith(
        studentId,
      );
      expect(mockRepository.getStudentReportCard).toHaveBeenCalledTimes(1);

      expect(updatePerformanceMock1).toHaveBeenCalledTimes(1);
      expect(updatePerformanceMock2).toHaveBeenCalledTimes(1);

      expect(mockRepository.save).toHaveBeenCalledTimes(2);
      expect(mockRepository.save).toHaveBeenCalledWith(mockRecord1);
      expect(mockRepository.save).toHaveBeenCalledWith(mockRecord2);

      expect(result).toEqual(records);
    });

    it('should handle empty list correctly', async () => {
      mockRepository.getStudentReportCard.mockResolvedValue([]);

      const result = await service.execute(studentId);

      expect(result).toEqual([]);
      expect(repository.save).not.toHaveBeenCalled();
    });

    it('should throw error if repository fails on fetch', async () => {
      const error = new Error('Database connection failed');
      mockRepository.getStudentReportCard.mockRejectedValue(error);

      await expect(service.execute(studentId)).rejects.toThrow(error);
    });

    it('should throw error if repository fails on save', async () => {
      const mockRecord = {
        updatePerformance: jest.fn(),
      } as unknown as AcademicRecordModel;
      mockRepository.getStudentReportCard.mockResolvedValue([mockRecord]);

      const error = new Error('Save failed');
      mockRepository.save.mockRejectedValue(error);

      await expect(service.execute(studentId)).rejects.toThrow(error);
    });
  });
});
