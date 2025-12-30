import { Injectable } from '@nestjs/common';
import { AcademicReportRepositoryPort } from '../../../../application/ports/out/academic-report.repository.port';
import { AcademicRecordModel } from '../../../../domain/academic-record.model';
import { Repository } from 'typeorm';
import { AcademicRecordEntity } from './academic-record.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmAcademicRecordAdapter implements AcademicReportRepositoryPort {
  constructor(
    @InjectRepository(AcademicRecordEntity)
    private readonly repository: Repository<AcademicRecordEntity>,
  ) {}

  async getStudentReportCard(
    studentId: string,
  ): Promise<AcademicRecordModel[]> {
    const academicRecords = await this.repository
      .createQueryBuilder('record')
      .innerJoinAndSelect('record.subject', 'subject')
      .leftJoinAndSelect(
        'subject.exams',
        'exam',
        'exam.student_id = :studentId',
        { studentId },
      )
      .where('record.student_id = :studentId', { studentId })
      .getMany();

    return academicRecords.map((entity) => entity.toDomain());
  }

  async save(model: AcademicRecordModel): Promise<AcademicRecordModel> {
    const academicRecord = this.repository.create(
      AcademicRecordEntity.fromDomain(model),
    );

    await this.repository.save(academicRecord);

    return academicRecord.toDomain();
  }
}
