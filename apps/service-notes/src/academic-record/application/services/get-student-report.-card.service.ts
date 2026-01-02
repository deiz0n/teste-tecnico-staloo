import { Inject, Logger } from '@nestjs/common';
import { AcademicRecordModel } from '../../domain/academic-record.model';
import { GetStudentReportCardUseCase } from '../ports/in/get-student-report-card.use-case';
import { AcademicReportRepositoryPort } from '../ports/out/academic-report.repository.port';

export class GetStudentReportCardService implements GetStudentReportCardUseCase {
  private readonly logger = new Logger(GetStudentReportCardService.name);

  constructor(
    @Inject(AcademicReportRepositoryPort)
    private readonly repository: AcademicReportRepositoryPort,
  ) {}

  async execute(studentId: string): Promise<AcademicRecordModel[]> {
    this.logger.log(`Fetching academic records for studentId: ${studentId}`);
    const records = await this.repository.getStudentReportCard(studentId);
    this.logger.log(
      `Found ${records.length} academic records for studentId: ${studentId}`,
    );

    this.logger.log(`Updating performance for ${records.length} records`);
    await Promise.all(
      records.map(async (record) => {
        record.updatePerformance();
        await this.repository.save(record);
      }),
    );
    this.logger.log(
      `Performance updated and saved for studentId: ${studentId}`,
    );

    return records;
  }
}
