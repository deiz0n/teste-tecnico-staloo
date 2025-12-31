import { ResponseServiceNotesDto } from '../../../domain/dto/response-service-notes.dto';

export abstract class NotesServiceClientPort {
  abstract getStudentReportCard(
    studentId: string,
  ): Promise<ResponseServiceNotesDto[]>;
}
