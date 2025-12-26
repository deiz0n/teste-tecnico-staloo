import { Injectable } from '@nestjs/common';
import { ExamRepositoryPort } from '../../../../application/ports/out/exam.repository.port';
import { ExamModel } from '../../../../domain/exam.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamEntity } from './exam.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TypeOrmExamAdapter implements ExamRepositoryPort {
  constructor(
    @InjectRepository(ExamEntity)
    private readonly repository: Repository<ExamEntity>,
  ) {}

  async getAllByStudent(studentId: string): Promise<ExamModel[]> {
    const exams = await this.repository.find({
      where: { student_id: studentId },
      relations: ['subject'],
    });

    return exams.map((examEntity) => examEntity.toDomain());
  }
}
