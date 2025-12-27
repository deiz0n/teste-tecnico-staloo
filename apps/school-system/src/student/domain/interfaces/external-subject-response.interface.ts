import { ExamDto } from '../dto/exam.dto';

export interface ExternalSubjectResponseInterface {
  name: string;
  workload: number;
  exams: ExamDto[];
}
