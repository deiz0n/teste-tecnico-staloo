import { StudentModel } from '../../../domain/student.model';

export abstract class GetStudentsByClassUseCase {
  abstract execute(classId: string): Promise<StudentModel[]>;
}
