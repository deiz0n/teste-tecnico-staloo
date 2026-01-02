import { Module } from '@nestjs/common';
import { StudentController } from './infrastructure/adapters/in/web/student.controller';
import { GetStudentsByClassService } from './application/services/get-students-by-class.service';
import { StudentRepositoryPort } from './application/ports/out/student.repository.port';
import { TypeOrmStudentAdapter } from './infrastructure/adapters/out/persistence/typeorm-student.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './infrastructure/adapters/out/persistence/student.entity';
import { GetStudentsByClassUseCase } from './application/ports/in/get-students-by-class.use-case';
import { ServiceNotesClientPort } from './application/ports/out/service-notes-client.port';
import { HttpServiceNotesAdapter } from './infrastructure/adapters/out/external/http-notes-service.adapter';
import { HttpModule } from '@nestjs/axios';
import { GetStudentReportCardUseCase } from './application/ports/in/get-student-report-card.use-case';
import { GetStudentReportCardService } from './application/services/get-student-report-card.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity]), HttpModule],
  controllers: [StudentController],
  providers: [
    { provide: GetStudentsByClassUseCase, useClass: GetStudentsByClassService },
    {
      provide: GetStudentReportCardUseCase,
      useClass: GetStudentReportCardService,
    },
    { provide: StudentRepositoryPort, useClass: TypeOrmStudentAdapter },
    { provide: ServiceNotesClientPort, useClass: HttpServiceNotesAdapter },
  ],
})
export class StudentModule {}
