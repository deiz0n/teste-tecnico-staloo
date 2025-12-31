import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NotesServiceClientPort } from '../../../../application/ports/out/notes-service.client.port';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SubjectDto } from '../../../../domain/dto/subject.dto';
import { ExternalAcademicRecordInterface } from '../../../../domain/interfaces/external-academic-record-response.interface';
import { ExamDto } from '../../../../domain/dto/exam.dto';

@Injectable()
export class HttpNotesServiceAdapter implements NotesServiceClientPort {
  private readonly notesServiceUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    const port = this.configService.get<string>('SERVICE_NOTES_PORT');
    const host = this.configService.get<string>('SERVICE_NOTES_HOST');

    this.notesServiceUrl = `http://${host}:${port}/subjects`;
  }

  async generateReportCard(studentId: string): Promise<SubjectDto[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<ExternalAcademicRecordInterface[]>(
          this.notesServiceUrl,
          {
            params: { studentId },
          },
        ),
      );

      if (!data) return [];

      return data.map(
        (item) =>
          new SubjectDto(
            item.name,
            item.workload,
            item.exams.map(
              (exam) => new ExamDto(exam.id, exam.score, exam.date),
            ),
          ),
      );
    } catch (e) {
      const errorMessage =
        e instanceof Error
          ? e.message
          : 'Unable to connect to the notes service';

      throw new InternalServerErrorException(errorMessage, { cause: e });
    }
  }
}
