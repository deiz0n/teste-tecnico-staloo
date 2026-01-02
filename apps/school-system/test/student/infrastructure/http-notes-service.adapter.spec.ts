import { Test, TestingModule } from '@nestjs/testing';
import { InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { randomUUID } from 'crypto';
import { HttpServiceNotesAdapter } from '../../../src/student/infrastructure/adapters/out/external/http-notes-service.adapter';
import { ExternalAcademicRecordInterface } from '../../../src/student/domain/interfaces/external-academic-record-response.interface';
import { ResponseServiceNotesDto } from '../../../src/student/domain/dto/response-service-notes.dto';

describe('HttpServiceNotesAdapter', () => {
  let adapter: HttpServiceNotesAdapter;

  const mockConfigService = {
    get: jest.fn().mockReturnValue('localhost'),
  };

  const mockHttpService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpServiceNotesAdapter,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    adapter = module.get<HttpServiceNotesAdapter>(HttpServiceNotesAdapter);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(adapter).toBeDefined();
  });

  describe('getStudentReportCard', () => {
    const studentId = randomUUID();

    it('should return mapped academic records when service returns data', async () => {
      const mockExternalData: ExternalAcademicRecordInterface[] = [
        {
          id: randomUUID(),
          studentId: randomUUID(),
          subject: {
            id: randomUUID(),
            name: 'Matemática',
            workload: 60,
            exams: [{ id: randomUUID(), date: '2025-10-10', score: '10' }],
          },
          finalGrade: 8.5,
          passed: true,
        },
        {
          id: randomUUID(),
          studentId: randomUUID(),
          subject: {
            id: randomUUID(),
            name: 'Português',
            workload: 40,
            exams: [{ id: randomUUID(), date: '2025-10-08', score: '7' }],
          },
          finalGrade: 7.0,
          passed: true,
        },
      ];

      mockHttpService.get.mockReturnValue(of({ data: mockExternalData }));

      const result = await adapter.getStudentReportCard(studentId);

      expect(mockHttpService.get).toHaveBeenCalledWith(
        `http://localhost:3000/academic-records/student/${studentId}`,
      );
      expect(mockHttpService.get).toHaveBeenCalledTimes(1);

      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(ResponseServiceNotesDto);
      expect(result[0].finalGrade).toBe(8.5);
      expect(result[0].passed).toBe(true);
      expect(result[1].finalGrade).toBe(7.0);
    });

    it('should return empty array when service returns null data', async () => {
      mockHttpService.get.mockReturnValue(of({ data: null }));

      const result = await adapter.getStudentReportCard(studentId);

      expect(result).toEqual([]);
    });

    it('should return empty array when service returns empty array', async () => {
      mockHttpService.get.mockReturnValue(of({ data: [] }));

      const result = await adapter.getStudentReportCard(studentId);

      expect(result).toEqual([]);
    });

    it('should throw InternalServerErrorException when http request fails', async () => {
      const error = new Error('Network error');
      mockHttpService.get.mockReturnValue(throwError(() => error));

      await expect(adapter.getStudentReportCard(studentId)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(adapter.getStudentReportCard(studentId)).rejects.toThrow(
        'Network error',
      );
    });

    it('should throw InternalServerErrorException with default message for non-Error exceptions', async () => {
      mockHttpService.get.mockReturnValue(throwError(() => 'Unknown error'));

      await expect(adapter.getStudentReportCard(studentId)).rejects.toThrow(
        InternalServerErrorException,
      );
      await expect(adapter.getStudentReportCard(studentId)).rejects.toThrow(
        'Unable to connect to the notes service',
      );
    });

    it('should use correct URL from config service', async () => {
      mockConfigService.get.mockReturnValue('notes-service');
      mockHttpService.get.mockReturnValue(of({ data: [] }));

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          HttpServiceNotesAdapter,
          {
            provide: ConfigService,
            useValue: mockConfigService,
          },
          {
            provide: HttpService,
            useValue: mockHttpService,
          },
        ],
      }).compile();

      const newAdapter = module.get<HttpServiceNotesAdapter>(
        HttpServiceNotesAdapter,
      );

      await newAdapter.getStudentReportCard(studentId);

      expect(mockHttpService.get).toHaveBeenCalledWith(
        `http://notes-service:3000/academic-records/student/${studentId}`,
      );
    });
  });
});
