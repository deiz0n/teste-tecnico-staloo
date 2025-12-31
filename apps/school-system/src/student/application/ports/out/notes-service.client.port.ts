import { ResponseServiceNotesDto } from '../../../domain/dto/response-service-notes.dto';

export abstract class NotesServiceClientPort {
  abstract generateReportCard(
    studentId: string,
  ): Promise<ResponseServiceNotesDto[]>;
}
