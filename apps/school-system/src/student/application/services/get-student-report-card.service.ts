import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AcademicRecordDto } from '../../domain/dto/academic-record.dto';
import { StudentRepositoryPort } from '../ports/out/student.repository.port';
import { ServiceNotesClientPort } from '../ports/out/notes-service.client.port';
import { GetStudentReportCardUseCase } from '../ports/in/get-student-report-card.use-case';

@Injectable()
export class GetStudentReportCardService implements GetStudentReportCardUseCase {
  constructor(
    @Inject()
    private readonly repository: StudentRepositoryPort,
    @Inject(ServiceNotesClientPort)
    private readonly httpClient: ServiceNotesClientPort,
  ) {}

  async execute(studentId: string): Promise<AcademicRecordDto> {
    const student = await this.repository.getStudentById(studentId);

    if (!student)
      throw new NotFoundException(
        `The student with id: ${studentId} not found`,
      );

    const exams = await this.httpClient.getStudentReportCard(studentId);

    return new AcademicRecordDto(student.name, exams);
  }
}
