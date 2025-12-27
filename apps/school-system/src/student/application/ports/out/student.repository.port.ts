import { StudentModel } from '../../../domain/student.model';

export abstract class StudentRepositoryPort {
  abstract getStudentsByClass(classId: string): Promise<StudentModel[]>;
  abstract getStudentById(studentId: string): Promise<StudentModel | null>;
}
