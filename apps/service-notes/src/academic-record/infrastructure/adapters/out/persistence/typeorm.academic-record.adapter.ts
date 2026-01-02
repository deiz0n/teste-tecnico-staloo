import { Injectable, Logger } from '@nestjs/common';
import { AcademicReportRepositoryPort } from '../../../../application/ports/out/academic-report.repository.port';
import { AcademicRecordModel } from '../../../../domain/academic-record.model';
import { Repository } from 'typeorm';
import { AcademicRecordEntity } from './academic-record.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmAcademicRecordAdapter implements AcademicReportRepositoryPort {
  private readonly logger = new Logger(TypeOrmAcademicRecordAdapter.name);

  constructor(
    @InjectRepository(AcademicRecordEntity)
    private readonly repository: Repository<AcademicRecordEntity>,
  ) {}

  async getStudentReportCard(
    studentId: string,
  ): Promise<AcademicRecordModel[]> {
    this.logger.log(`Querying academic records for studentId: ${studentId}`);
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
    this.logger.log(
      `Found ${academicRecords.length} academic records in database for studentId: ${studentId}`,
    );

    return academicRecords.map((entity) => entity.toDomain());
  }

  async save(model: AcademicRecordModel): Promise<AcademicRecordModel> {
    this.logger.log(`Saving academic record with id: ${model.id}`);
    const academicRecord = this.repository.create(
      AcademicRecordEntity.fromDomain(model),
    );

    await this.repository.save(academicRecord);
    this.logger.log(`Academic record saved successfully with id: ${model.id}`);

    return academicRecord.toDomain();
  }
}
