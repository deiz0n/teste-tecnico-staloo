import { SubjectDto } from '../dto/subject.dto';

export interface ExternalAcademicRecordInterface {
  subject: SubjectDto[];
  finalGrade: number;
  passed: boolean;
}
