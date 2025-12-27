import { Module } from '@nestjs/common';
import { StudentController } from './infrastructure/adapters/in/web/student.controller';
import { GetStudentsByClassService } from './application/services/get-students-by-class.service';
import { StudentRepositoryPort } from './application/ports/out/student.repository.port';
import { TypeOrmStudentAdapter } from './infrastructure/adapters/out/persistence/typeorm-student.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './infrastructure/adapters/out/persistence/student.entity';
import { GetStudentsByClassUseCase } from './application/ports/in/get-students-by-class.use-case';
import { NotesServiceClientPort } from './application/ports/out/notes-service.client.port';
import { HttpNotesServiceAdapter } from './infrastructure/adapters/out/external/http-notes-service.adapter';
import { HttpModule } from '@nestjs/axios';
import { GenerateReportCardUseCase } from './application/ports/in/generate-report-card.use-case';
import { GenerateReportCardService } from './application/services/generate-report-card.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity]), HttpModule],
  controllers: [StudentController],
  providers: [
    { provide: GetStudentsByClassUseCase, useClass: GetStudentsByClassService },
    { provide: GenerateReportCardUseCase, useClass: GenerateReportCardService },
    { provide: StudentRepositoryPort, useClass: TypeOrmStudentAdapter },
    { provide: NotesServiceClientPort, useClass: HttpNotesServiceAdapter },
  ],
})
export class StudentModule {}
