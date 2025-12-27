import { Inject } from '@nestjs/common';
import { SubjectModel } from '../../domain/subject.model';
import { GetAllByStudentUseCase } from '../ports/in/get-all-by-student.use-case';
import { SubjectRepositoryPort } from '../ports/out/subject.repository.port';

export class GetAllByStudentService implements GetAllByStudentUseCase {
  constructor(
    @Inject(SubjectRepositoryPort)
    private readonly repository: SubjectRepositoryPort,
  ) {}

  execute(studentId: string): Promise<SubjectModel[]> {
    return this.repository.getAllByStudent(studentId);
  }
}
