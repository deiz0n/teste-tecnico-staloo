import { NestFactory } from '@nestjs/core';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from './app.module';
import { ExamEntity } from './exam/infrastructure/adapters/out/persistence/exam.entity';
import { SubjectEntity } from './subject/infrastructure/adapters/out/persistence/subject.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const examRepo = app.get<Repository<ExamEntity>>(
    getRepositoryToken(ExamEntity),
  );
  const subjectRepo = app.get<Repository<SubjectEntity>>(
    getRepositoryToken(SubjectEntity),
  );

  console.info('🌱 Starting seed Notes Service...');

  try {
    await examRepo.createQueryBuilder().delete().execute();
    await subjectRepo.createQueryBuilder().delete().execute();
  } catch (e) {
    console.warn(
      'Tables were already empty or a constraint error was ignored during reset..',
    );
  }

  const subjectEntity = subjectRepo.create({
    id: 'a3281dd7-a3ab-4eff-9146-37e3cda348f3',
    name: 'Matemática',
    workload: 90,
  });

  await subjectRepo.save(subjectEntity);

  const examEntity = examRepo.create({
    id: '84dd54fb-57c4-41fb-8c39-540ddcc65c80',
    score: 7.35,
    date: new Date(),
    student_id: '7b16e374-58ba-4995-a0ba-96980760c427',
    subject: subjectEntity,
  });

  await examRepo.save(examEntity);

  console.info('✅ Seed Service Notes successfully completed');

  await app.close();
}

bootstrap();
