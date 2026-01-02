import { ExternalExamInterface } from './external-exam.interface';

export interface ExternalSubjectInterface {
  id: string;
  name: string;
  workload: number;
  exams: ExternalExamInterface[];
}
