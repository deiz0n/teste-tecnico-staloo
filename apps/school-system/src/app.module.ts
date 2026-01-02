import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { ClassModule } from './class/class.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from './class/infrastructure/adapters/out/persistence/class.entity';
import { StudentEntity } from './student/infrastructure/adapters/out/persistence/student.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host:
          configService.get<string>('SCHOOL_SYSTEM_DB_HOST') ||
          'school-system-database',
        port: configService.get<number>('SCHOOL_SYSTEM_DB_PORT') || 5432,
        username: configService.get<string>('SCHOOL_SYSTEM_DB_USER') || 'dudu1',
        password:
          configService.get<string>('SCHOOL_SYSTEM_DB_PASSWORD') || '1234567',
        database:
          configService.get<string>('SCHOOL_SYSTEM_DB') || 'school_system',
        entities: [ClassEntity, StudentEntity],
        synchronize: true,
        logging: true,
      }),
    }),
    StudentModule,
    ClassModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
