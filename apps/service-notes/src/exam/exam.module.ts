import { Module } from '@nestjs/common';
import { GetAllByStudentUseCase } from './application/ports/in/get-all-by-student.use-case';
import { GetAllByStudentService } from './application/services/get-all-by-student.service';
import { ExamRepositoryPort } from './application/ports/out/exam.repository.port';
import { TypeOrmExamAdapter } from './infrastructure/adapters/out/persistence/typeorm-exam.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamEntity } from './infrastructure/adapters/out/persistence/exam.entity';
import { ExamController } from './infrastructure/adapters/in/web/exam.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExamEntity])],
  controllers: [ExamController],
  providers: [
    { provide: GetAllByStudentUseCase, useClass: GetAllByStudentService },
    { provide: ExamRepositoryPort, useClass: TypeOrmExamAdapter },
  ],
})
export class ExamModule {}
