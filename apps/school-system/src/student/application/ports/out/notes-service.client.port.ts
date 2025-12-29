import { SubjectDto } from '../../../domain/dto/subject.dto';

export abstract class NotesServiceClientPort {
  abstract generateReportCard(studentId: string): Promise<SubjectDto[]>;
}
