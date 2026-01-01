import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ServiceNotesClientPort } from '../../../../application/ports/out/notes-service.client.port';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ExternalAcademicRecordInterface } from '../../../../domain/interfaces/external-academic-record-response.interface';
import { ResponseServiceNotesDto } from '../../../../domain/dto/response-service-notes.dto';

@Injectable()
export class HttpServiceNotesAdapter implements ServiceNotesClientPort {
  private readonly notesServiceUrl: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    const host = this.configService.get<string>('SERVICE_NOTES_HOST');

    this.notesServiceUrl = `http://${host}:3000/academic-records/student/`;
  }

  async getStudentReportCard(
    studentId: string,
  ): Promise<ResponseServiceNotesDto[]> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<ExternalAcademicRecordInterface[]>(
          `${this.notesServiceUrl}${studentId}`,
        ),
      );

      if (!data) return [];

      return data.map(
        (item) =>
          new ResponseServiceNotesDto(
            item.subject,
            item.finalGrade,
            item.passed,
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
