import { Inject, Logger } from '@nestjs/common';
import { StudentModel } from '../../domain/student.model';
import { GetStudentsByClassUseCase } from '../ports/in/get-students-by-class.use-case';
import { StudentRepositoryPort } from '../ports/out/student.repository.port';

export class GetStudentsByClassService implements GetStudentsByClassUseCase {
  private readonly logger = new Logger(GetStudentsByClassService.name);

  constructor(
    @Inject()
    private readonly repository: StudentRepositoryPort,
  ) {}

  async execute(classId: string): Promise<StudentModel[]> {
    this.logger.log(`Executing get students by class for classId: ${classId}`);
    const students = await this.repository.getStudentsByClass(classId);
    this.logger.log(
      `Retrieved ${students.length} students for classId: ${classId}`,
    );
    return students;
  }
}
