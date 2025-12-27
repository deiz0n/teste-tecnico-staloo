import { NestFactory } from '@nestjs/core';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from './src/app.module';
import { ExamEntity } from './src/exam/infrastructure/adapters/out/persistence/exam.entity';
import { SubjectEntity } from './src/subject/infrastructure/adapters/out/persistence/subject.entity';
import { randomUUID } from 'crypto';

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

  const subjectEntity2 = subjectRepo.create({
    id: randomUUID(),
    name: 'Biologia',
    workload: 120,
  });

  await subjectRepo.save(subjectEntity);
  await subjectRepo.save(subjectEntity2);

  const examEntity = examRepo.create({
    id: '84dd54fb-57c4-41fb-8c39-540ddcc65c80',
    score: 7.35,
    date: new Date(),
    student_id: '7b16e374-58ba-4995-a0ba-96980760c427',
    subject: subjectEntity,
  });

  const examEntity3 = examRepo.create({
    id: randomUUID(),
    score: 10,
    date: new Date(),
    student_id: '7b16e374-58ba-4995-a0ba-96980760c427',
    subject: subjectEntity,
  });

  const examEntity2 = examRepo.create({
    id: randomUUID(),
    score: 10,
    date: new Date(),
    student_id: '7b16e374-58ba-4995-a0ba-96980760c427',
    subject: subjectEntity2,
  });

  await examRepo.save(examEntity);
  await examRepo.save(examEntity2);
  await examRepo.save(examEntity3);

  console.info('✅ Seed Service Notes successfully completed');

  await app.close();
}

bootstrap();
