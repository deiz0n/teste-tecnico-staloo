import { Student } from '../../domain/student.model';

export abstract class GetStudentsByClassUseCase {
  abstract execute(class_id: string): Promise<Student[]>;
}
