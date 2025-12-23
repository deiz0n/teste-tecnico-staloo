import { StudentModel } from '../../../domain/student.model';

export abstract class GetStudentsByClass {
  abstract execute(class_id: string): Promise<StudentModel[]>;
}
