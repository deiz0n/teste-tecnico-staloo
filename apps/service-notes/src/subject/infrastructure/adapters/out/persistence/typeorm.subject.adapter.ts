import { InjectRepository } from '@nestjs/typeorm';
import { SubjectRepositoryPort } from '../../../../application/ports/out/subject.repository.port';
import { SubjectModel } from '../../../../domain/subject.model';
import { SubjectEntity } from './subject.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmSubjectAdapter implements SubjectRepositoryPort {
  constructor(
    @InjectRepository(SubjectEntity)
    private readonly repository: Repository<SubjectEntity>,
  ) {}

  async getAllByStudent(studentId: string): Promise<SubjectModel[]> {
    const subjects = await this.repository
      .createQueryBuilder('subject')
      .innerJoinAndSelect(
        'subject.exams',
        'exam',
        'exam.student_id = :studentId',
        { studentId },
      )
      .getMany();

    return subjects.map((subjectEntity) => subjectEntity.toDomain());
  }
}
