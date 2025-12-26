import { ExamModel } from '../../domain/exam.model';

export abstract class getAllByStudents {
  abstract execute(): Promise<ExamModel[]>;
}
