import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectModule } from './subject/subject.module';
import { ExamModule } from './exam/exam.module';
import { ExamEntity } from './exam/infrastructure/adapters/out/persistence/exam.entity';
import { SubjectEntity } from './subject/infrastructure/adapters/out/persistence/subject.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('SERVICE_NOTES_DB_HOST'),
        port: configService.get<number>('SERVICE_NOTES_DB_PORT'),
        username: configService.get<string>('SERVICE_NOTES_DB_USER'),
        password: configService.get<string>('SERVICE_NOTES_DB_PASSWORD'),
        database: configService.get<string>('SERVICE_NOTES_DB'),
        entities: [ExamEntity, SubjectEntity],
        synchronize: true,
      }),
    }),
    SubjectModule,
    ExamModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
