import { Inject } from '@nestjs/common';
import { ExamModel } from '../../domain/exam.model';
import { GetAllByStudentUseCase } from '../ports/in/get-all-by-student.use-case';
import { ExamRepositoryPort } from '../ports/out/exam.repository.port';

export class GetAllByStudentService implements GetAllByStudentUseCase {
  constructor(
    @Inject(ExamRepositoryPort)
    private readonly repository: ExamRepositoryPort,
  ) {}

  execute(studentId: string): Promise<ExamModel[]> {
    return this.repository.getAllByStudent(studentId);
  }
}
