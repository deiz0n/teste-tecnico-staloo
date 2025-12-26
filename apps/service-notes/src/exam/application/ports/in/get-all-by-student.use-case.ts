import { ExamModel } from '../../../domain/exam.model';

export abstract class GetAllByStudentUseCase {
  abstract execute(): Promise<ExamModel[]>;
}
