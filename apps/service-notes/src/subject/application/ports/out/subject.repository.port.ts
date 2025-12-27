import { SubjectModel } from '../../../domain/subject.model';

export abstract class SubjectRepositoryPort {
  abstract getAllByStudent(studentId: string): Promise<SubjectModel[]>;
}
