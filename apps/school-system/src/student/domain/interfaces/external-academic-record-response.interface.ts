import { ExternalSubjectInterface } from './external-subject.interface';

export interface ExternalAcademicRecordInterface {
  id: string;
  studentId: string;
  subject: ExternalSubjectInterface;
  finalGrade: number;
  passed: boolean;
}
