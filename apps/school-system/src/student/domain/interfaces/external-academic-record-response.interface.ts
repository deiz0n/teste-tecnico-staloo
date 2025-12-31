import { ExamDto } from '../dto/exam.dto';

export interface ExternalAcademicRecordInterface {
  name: string;
  workload: number;
  exams: ExamDto[];
}
