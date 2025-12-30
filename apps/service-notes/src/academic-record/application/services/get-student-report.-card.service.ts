import { Inject } from '@nestjs/common';
import { AcademicRecordModel } from '../../domain/academic-record.model';
import { GetStudentReportCardUseCase } from '../ports/in/get-student-report-card.use-case';
import { AcademicReportRepositoryPort } from '../ports/out/academic-report.repository.port';

export class GetStudentReportCardService implements GetStudentReportCardUseCase {
  constructor(
    @Inject(AcademicReportRepositoryPort)
    private readonly repository: AcademicReportRepositoryPort,
  ) {}

  async execute(studentId: string): Promise<AcademicRecordModel[]> {
    const records = await this.repository.getStudentReportCard(studentId);

    await Promise.all(
      records.map(async (record) => {
        record.updatePerformance();
        await this.repository.save(record);
      }),
    );

    return records;
  }
}
