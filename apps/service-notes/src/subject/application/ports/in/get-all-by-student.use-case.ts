import { SubjectModel } from '../../../domain/subject.model';

export abstract class GetAllByStudentUseCase {
  abstract execute(studentId: string): Promise<SubjectModel[]>;
}
