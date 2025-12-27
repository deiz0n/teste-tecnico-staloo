import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { NotesServiceClientPort } from '../../../../application/ports/out/notes-service.client.port';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { SubjectDto } from '../../../../domain/dto/subject.dto';
import { ExternalSubjectResponseInterface } from '../../../../domain/interfaces/external-subject-response.interface';

@Injectable()
export class HttpNotesServiceAdapter implements NotesServiceClientPort {
  private readonly notesServiceUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    const port = this.configService.getOrThrow<string>('SERVICE_NOTES_PORT');

    this.notesServiceUrl = `http://localhost:${port}/exams`;
  }

  async generateReportCard(studentId: string): Promise<SubjectDto[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<ExternalSubjectResponseInterface[]>(
          this.notesServiceUrl,
          {
            params: { studentId },
          },
        ),
      );

      if (!data) return [];

      return data.map(
        (item) => new SubjectDto(item.name, item.workload, item.exams),
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
