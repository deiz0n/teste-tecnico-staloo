import { StudentModel } from '../../../domain/student.model';

export abstract class StudentRepositoryPort {
  abstract getStudentsByClass(class_id: string): Promise<StudentModel[]>;
}
