import { Inject } from '@nestjs/common';
import { StudentModel } from '../../domain/student.model';
import { GetStudentsByClassUseCase } from '../ports/in/get-students-by-class.use-case';
import { StudentRepositoryPort } from '../ports/out/student.repository.port';

export class GetStudentsByClassService implements GetStudentsByClassUseCase {
  constructor(
    @Inject()
    private readonly repository: StudentRepositoryPort,
  ) {}

  async execute(class_id: string): Promise<StudentModel[]> {
    return this.repository.getStudentsByClass(class_id);
  }
}
