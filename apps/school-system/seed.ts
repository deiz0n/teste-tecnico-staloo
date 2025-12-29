import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { Repository } from 'typeorm';
import { ClassEntity } from './src/class/infrastructure/adapters/out/persistence/class.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StudentEntity } from './src/student/infrastructure/adapters/out/persistence/student.entity';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const classRepo = app.get<Repository<ClassEntity>>(
    getRepositoryToken(ClassEntity),
  );
  const studentRepo = app.get<Repository<StudentEntity>>(
    getRepositoryToken(StudentEntity),
  );

  console.info('🌱 Starting seed School System...');

  try {
    await studentRepo.createQueryBuilder().delete().execute();

    await classRepo.createQueryBuilder().delete().execute();
  } catch (e) {
    console.warn(
      'Tables were already empty or a constraint error was ignored during reset..',
    );
  }

  const classEntity = classRepo.create({
    id: '9e9e4c6a-57e8-4473-abdf-56e1456e7cea',
    name: 'Turma 9',
    location: 'Predio A, Sala 10',
  });

  const studentEntity = studentRepo.create({
    id: '7b16e374-58ba-4995-a0ba-96980760c427',
    name: 'dudu',
    cpf: '12345678900',
    address: 'Rua das Flores',
    dateBirth: new Date('2002-03-18'),
    classes: [classEntity],
  });

  await classRepo.save(classEntity);

  await studentRepo.save(studentEntity);

  console.info('✅ Seed School System successfully completed');
  await app.close();
}

bootstrap();
