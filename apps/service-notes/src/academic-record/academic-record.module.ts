import { Module } from '@nestjs/common';
import { AcademicRecordController } from './infrastructure/adapters/in/academic-record.controller';
import { GetStudentReportCardUseCase } from './application/ports/in/get-student-report-card.use-case';
import { GetStudentReportCardService } from './application/services/get-student-report.-card.service';
import { TypeOrmAcademicRecordAdapter } from './infrastructure/adapters/out/persistence/typeorm.academic-record.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicRecordEntity } from './infrastructure/adapters/out/persistence/academic-record.entity';
import { AcademicReportRepositoryPort } from './application/ports/out/academic-report.repository.port';

@Module({
  imports: [TypeOrmModule.forFeature([AcademicRecordEntity])],
  controllers: [AcademicRecordController],
  providers: [
    {
      provide: GetStudentReportCardUseCase,
      useClass: GetStudentReportCardService,
    },
    {
      provide: AcademicReportRepositoryPort,
      useClass: TypeOrmAcademicRecordAdapter,
    },
  ],
})
export class AcademicRecordModule {}
