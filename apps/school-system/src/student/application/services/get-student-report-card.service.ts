import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AcademicRecordDto } from '../../domain/dto/academic-record.dto';
import { StudentRepositoryPort } from '../ports/out/student.repository.port';
import { ServiceNotesClientPort } from '../ports/out/service-notes-client.port';
import { GetStudentReportCardUseCase } from '../ports/in/get-student-report-card.use-case';

@Injectable()
export class GetStudentReportCardService implements GetStudentReportCardUseCase {
  private readonly logger = new Logger(GetStudentReportCardService.name);

  constructor(
    @Inject()
    private readonly repository: StudentRepositoryPort,
    @Inject(ServiceNotesClientPort)
    private readonly httpClient: ServiceNotesClientPort,
  ) {}

  async execute(studentId: string): Promise<AcademicRecordDto> {
    this.logger.log(`Fetching student report card for studentId: ${studentId}`);
    const student = await this.repository.getStudentById(studentId);

    if (!student) {
      this.logger.warn(`Student not found with id: ${studentId}`);
      throw new NotFoundException(
        `The student with id: ${studentId} not found`,
      );
    }

    this.logger.log(
      `Student found: ${student.name}, fetching exams from notes service`,
    );
    const exams = await this.httpClient.getStudentReportCard(studentId);
    this.logger.log(
      `Retrieved ${exams.length} exam records for studentId: ${studentId}`,
    );

    return new AcademicRecordDto(student.name, exams);
  }
}
