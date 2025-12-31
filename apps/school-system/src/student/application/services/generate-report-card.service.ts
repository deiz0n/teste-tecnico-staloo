import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AcademicRecordDto } from '../../domain/dto/academic-record.dto';
import { GenerateReportCardUseCase } from '../ports/in/generate-report-card.use-case';
import { StudentRepositoryPort } from '../ports/out/student.repository.port';
import { NotesServiceClientPort } from '../ports/out/notes-service.client.port';

@Injectable()
export class GenerateReportCardService implements GenerateReportCardUseCase {
  constructor(
    @Inject()
    private readonly repository: StudentRepositoryPort,
    @Inject(NotesServiceClientPort)
    private readonly httpClient: NotesServiceClientPort,
  ) {}

  async execute(studentId: string): Promise<AcademicRecordDto> {
    const student = await this.repository.getStudentById(studentId);

    if (!student)
      throw new NotFoundException(
        `The student with id: ${studentId} not found`,
      );

    const exams = await this.httpClient.generateReportCard(studentId);

    return new AcademicRecordDto(student.name, exams);
  }
}
