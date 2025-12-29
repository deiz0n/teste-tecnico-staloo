import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamEntity } from './infrastructure/adapters/out/persistence/exam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExamEntity])],
  controllers: [],
  providers: [],
})
export class ExamModule {}
