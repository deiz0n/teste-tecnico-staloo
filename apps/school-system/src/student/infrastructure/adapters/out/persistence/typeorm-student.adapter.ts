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

  getStudentsByClass(classId: string): Promise<StudentModel[]> {
    return this.repository.find({
      where: {
        classes: { id: classId },
      },
      relations: ['classes'],
    });
  }
}
