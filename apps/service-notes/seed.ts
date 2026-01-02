import { NestFactory } from '@nestjs/core';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppModule } from './src/app.module';
import { ExamEntity } from './src/exam/infrastructure/adapters/out/persistence/exam.entity';
import { SubjectEntity } from './src/subject/infrastructure/adapters/out/persistence/subject.entity';
import { AcademicRecordEntity } from './src/academic-record/infrastructure/adapters/out/persistence/academic-record.entity';
import { randomUUID } from 'crypto';
import { fakerPT_BR as faker } from '@faker-js/faker';

const STATIC_STUDENT_IDS = [
  '7b16e374-58ba-4995-a0ba-96980760c427',
  'a1b2c3d4-1111-2222-3333-444455556666',
  'b2c3d4e5-2222-3333-4444-555566667777',
  'c3d4e5f6-3333-4444-5555-666677778888',
  'd4e5f6a7-4444-5555-6666-777788889999',
  'e5f6a7b8-5555-6666-7777-888899990000',
  'f6a7b8c9-6666-7777-8888-999900001111',
  'a7b8c9d0-7777-8888-9999-000011112222',
  'b8c9d0e1-8888-9999-0000-111122223333',
  'c9d0e1f2-9999-0000-1111-222233334444',
  'd0e1f2a3-0000-1111-2222-333344445555',
  'e1f2a3b4-1111-2222-3333-444455556666',
  'f2a3b4c5-2222-3333-4444-555566667777',
  'a3b4c5d6-3333-4444-5555-666677778888',
  'b4c5d6e7-4444-5555-6666-777788889999',
];

const STATIC_SUBJECT_IDS = [
  'a3281dd7-a3ab-4eff-9146-37e3cda348f3',
  'b4392ee8-b4bc-5ff0-a257-48f4deb459a4',
  'c5403ff9-c5cd-6aa1-b368-59a5efc56ab5',
  'd6514aa0-d6de-7bb2-c479-60b6fad67bc6',
  'e7625bb1-e7ef-8cc3-d580-71c7abe78cd7',
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const examRepo = app.get<Repository<ExamEntity>>(
    getRepositoryToken(ExamEntity),
  );
  const subjectRepo = app.get<Repository<SubjectEntity>>(
    getRepositoryToken(SubjectEntity),
  );
  const academicRecordRepo = app.get<Repository<AcademicRecordEntity>>(
    getRepositoryToken(AcademicRecordEntity),
  );

  console.info('🌱 Starting seed Notes Service...');

  try {
    await academicRecordRepo.createQueryBuilder().delete().execute();
    await examRepo.createQueryBuilder().delete().execute();
    await subjectRepo.createQueryBuilder().delete().execute();
  } catch (e) {
    console.warn(
      'Tables were already empty or a constraint error was ignored during reset..',
    );
  }

  const subjectNames = [
    'Matemática',
    'Português',
    'História',
    'Biologia',
    'Física',
  ];
  const workloads = [90, 80, 60, 80, 70];

  const subjectEntities: SubjectEntity[] = [];
  for (let i = 0; i < 5; i++) {
    const subjectEntity = subjectRepo.create({
      id: STATIC_SUBJECT_IDS[i],
      name: subjectNames[i],
      workload: workloads[i],
    });
    subjectEntities.push(subjectEntity);
  }

  await subjectRepo.save(subjectEntities);
  console.info(`✅ ${subjectEntities.length} subjects created`);

  const examEntities: ExamEntity[] = [];
  for (const studentId of STATIC_STUDENT_IDS) {
    for (const subject of subjectEntities) {
      const numExams = faker.number.int({ min: 2, max: 3 });
      for (let i = 0; i < numExams; i++) {
        const examEntity = examRepo.create({
          id: randomUUID(),
          score: parseFloat(
            faker.number
              .float({ min: 0, max: 10, fractionDigits: 2 })
              .toFixed(2),
          ),
          date: faker.date.recent({ days: 90 }),
          student_id: studentId,
          subject: subject,
        });
        examEntities.push(examEntity);
      }
    }
  }

  await examRepo.save(examEntities);
  console.info(`✅ ${examEntities.length} exams created`);

  const academicRecordEntities: AcademicRecordEntity[] = [];
  for (const studentId of STATIC_STUDENT_IDS) {
    for (const subject of subjectEntities) {
      const studentExams = examEntities.filter(
        (exam) =>
          exam.student_id === studentId && exam.subject.id === subject.id,
      );

      const totalScore = studentExams.reduce(
        (sum, exam) => sum + exam.score,
        0,
      );
      const finalGrade = parseFloat(
        (totalScore / studentExams.length).toFixed(2),
      );
      const passed = finalGrade >= 7.0;

      const recordEntity = academicRecordRepo.create({
        id: randomUUID(),
        student_id: studentId,
        subject: subject,
        final_grade: finalGrade,
        passed: passed,
      });
      academicRecordEntities.push(recordEntity);
    }
  }

  await academicRecordRepo.save(academicRecordEntities);
  console.info(`✅ ${academicRecordEntities.length} academic records created`);

  console.info('✅ Seed Service Notes successfully completed');

  await app.close();
}

bootstrap();
