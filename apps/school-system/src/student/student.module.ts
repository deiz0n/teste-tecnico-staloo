import { Module } from '@nestjs/common';
import { StudentController } from './infrastructure/adapters/in/web/student.controller';
import { GetStudentsByClassService } from './application/services/get-students-by-class.service';
import { StudentRepositoryPort } from './application/ports/out/student.repository.port';
import { TypeOrmStudentAdapter } from './infrastructure/adapters/out/persistence/typeorm-student.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './infrastructure/adapters/out/persistence/student.entity';
import { GetStudentsByClassUseCase } from './application/ports/in/get-students-by-class.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  controllers: [StudentController],
  providers: [
    { provide: GetStudentsByClassUseCase, useClass: GetStudentsByClassService },
    { provide: StudentRepositoryPort, useClass: TypeOrmStudentAdapter },
  ],
})
export class StudentModule {}
