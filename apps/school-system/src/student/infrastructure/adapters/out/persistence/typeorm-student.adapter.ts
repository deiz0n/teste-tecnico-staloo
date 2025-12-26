import { Injectable } from '@nestjs/common';
import { StudentRepositoryPort } from '../../../../application/ports/out/student.repository.port';
import { Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentModel } from '../../../../domain/student.model';

@Injectable()
export class TypeOrmStudentAdapter implements StudentRepositoryPort {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly repository: Repository<StudentEntity>,
  ) {}

  async getStudentsByClass(classId: string): Promise<StudentModel[]> {
    const students = await this.repository.find({
      where: {
        classes: { id: classId },
      },
      relations: ['classes'],
    });

    return students.map((StudentEntity) => StudentEntity.toDomain());
  }
}
