import { Injectable, Logger } from '@nestjs/common';
import { StudentRepositoryPort } from '../../../../application/ports/out/student.repository.port';
import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentModel } from '../../../../domain/student.model';

@Injectable()
export class TypeOrmStudentAdapter implements StudentRepositoryPort {
  private readonly logger = new Logger(TypeOrmStudentAdapter.name);

  constructor(
    @InjectRepository(StudentEntity)
    private readonly repository: Repository<StudentEntity>,
  ) {}

  async getStudentsByClass(classId: string): Promise<StudentModel[]> {
    this.logger.log(`Querying students by classId: ${classId}`);
    const students = await this.repository.find({
      where: {
        classes: { id: classId },
      },
      relations: ['classes'],
    });
    this.logger.log(
      `Found ${students.length} students in database for classId: ${classId}`,
    );

    return students.map((StudentEntity) => StudentEntity.toDomain());
  }

  async getStudentById(studentId: string): Promise<StudentModel | null> {
    this.logger.log(`Querying student by id: ${studentId}`);
    const student = await this.repository.findOne({
      where: { id: studentId },
    });
    this.logger.log(`Student query completed for id: ${studentId}`);

    return new StudentModel(
      student.id,
      student.name,
      student.cpf,
      student.address,
      student.dateBirth,
    );
  }
}
