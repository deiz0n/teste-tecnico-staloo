import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectModule } from './subject/subject.module';
import { ExamModule } from './exam/exam.module';
import { ExamEntity } from './exam/infrastructure/adapters/out/persistence/exam.entity';
import { SubjectEntity } from './subject/infrastructure/adapters/out/persistence/subject.entity';
import { AcademicRecordModule } from './academic-record/academic-record.module';
import { AcademicRecordEntity } from './academic-record/infrastructure/adapters/out/persistence/academic-record.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host:
          configService.get<string>('SERVICE_NOTES_DB_HOST') ||
          'service-notes-database',
        port: configService.get<number>('SERVICE_NOTES_DB_PORT') || 5433,
        username: configService.get<string>('SERVICE_NOTES_DB_USER') || 'dudu2',
        password:
          configService.get<string>('SERVICE_NOTES_DB_PASSWORD') || '1234567',
        database:
          configService.get<string>('SERVICE_NOTES_DB') || 'service_notes',
        entities: [ExamEntity, SubjectEntity, AcademicRecordEntity],
        synchronize: true,
        logging: true,
      }),
    }),
    SubjectModule,
    ExamModule,
    AcademicRecordModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
