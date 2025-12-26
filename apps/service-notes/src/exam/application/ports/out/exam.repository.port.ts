import { ExamModel } from '../../domain/exam.model';

export abstract class ExamRepositoryPort {
  abstract getAllByStudent(studentId: string): Promise<ExamModel[]>;
}
