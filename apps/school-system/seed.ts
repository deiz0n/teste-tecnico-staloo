import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { DataSource, Repository } from 'typeorm';
import { ClassEntity } from './src/class/infrastructure/adapters/out/persistence/class.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StudentEntity } from './src/student/infrastructure/adapters/out/persistence/student.entity';
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

const STATIC_CLASS_IDS = [
  '9e9e4c6a-57e8-4473-abdf-56e1456e7cea',
  'aa1b2c3d-1111-2222-3333-444455556666',
  'bb2c3d4e-2222-3333-4444-555566667777',
  'cc3d4e5f-3333-4444-5555-666677778888',
  'dd4e5f6a-4444-5555-6666-777788889999',
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const classRepo = app.get<Repository<ClassEntity>>(
    getRepositoryToken(ClassEntity),
  );
  const studentRepo = app.get<Repository<StudentEntity>>(
    getRepositoryToken(StudentEntity),
  );
  const dataSource = app.get(DataSource);

  console.info('🌱 Starting seed School System...');

  try {
    await dataSource.query('DELETE FROM "tb_student_class"');
    await studentRepo.createQueryBuilder().delete().execute();
    await classRepo.createQueryBuilder().delete().execute();
  } catch (e) {
    console.warn(
      'Tables were already empty or a constraint error was ignored during reset..',
    );
  }

  const classNames = [
    'Turma 9A',
    'Turma 9B',
    'Turma 8A',
    'Turma 8B',
    'Turma 7A',
  ];
  const buildings = ['Prédio A', 'Prédio B', 'Prédio C'];

  const classEntities: ClassEntity[] = [];
  for (let i = 0; i < 5; i++) {
    const classEntity = classRepo.create({
      id: STATIC_CLASS_IDS[i],
      name: classNames[i],
      location: `${faker.helpers.arrayElement(buildings)}, Sala ${faker.number.int({ min: 1, max: 20 })}`,
    });
    classEntities.push(classEntity);
  }

  await classRepo.save(classEntities);
  console.info(`✅ ${classEntities.length} classes created`);

  const studentEntities: StudentEntity[] = [];
  for (let i = 0; i < 15; i++) {
    const studentEntity = studentRepo.create({
      id: STATIC_STUDENT_IDS[i],
      name: faker.person.fullName(),
      cpf: faker.string.numeric(11),
      address: `${faker.location.streetAddress()}, ${faker.location.city()} - ${faker.location.state({ abbreviated: true })}`,
      dateBirth: faker.date.birthdate({ min: 10, max: 18, mode: 'age' }),
      classes: [faker.helpers.arrayElement(classEntities)],
    });
    studentEntities.push(studentEntity);
  }

  await studentRepo.save(studentEntities);
  console.info(`✅ ${studentEntities.length} students created`);

  console.info('✅ Seed School System successfully completed');
  await app.close();
}

bootstrap();
