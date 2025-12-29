import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectEntity } from './infrastructure/adapters/out/persistence/subject.entity';
import { SubjectController } from './infrastructure/adapters/in/web/subject.controller';
import { GetAllByStudentUseCase } from './application/ports/in/get-all-by-student.use-case';
import { GetAllByStudentService } from './application/services/get-all-by-student.service';
import { SubjectRepositoryPort } from './application/ports/out/subject.repository.port';
import { TypeOrmSubjectAdapter } from './infrastructure/adapters/out/persistence/typeorm.subject.adapter';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectEntity])],
  controllers: [SubjectController],
  providers: [
    { provide: GetAllByStudentUseCase, useClass: GetAllByStudentService },
    { provide: SubjectRepositoryPort, useClass: TypeOrmSubjectAdapter },
  ],
})
export class SubjectModule {}
