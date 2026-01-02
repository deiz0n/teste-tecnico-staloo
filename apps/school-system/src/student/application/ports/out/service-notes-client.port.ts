import { ResponseServiceNotesDto } from '../../../domain/dto/response-service-notes.dto';

export abstract class ServiceNotesClientPort {
  abstract getStudentReportCard(
    studentId: string,
  ): Promise<ResponseServiceNotesDto[]>;
}
