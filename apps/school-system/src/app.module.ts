import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
        host: configService.get<string>('SCHOOL_SYSTEM_DB_HOST'),
        port: configService.get<number>('SCHOOL_SYSTEM_DB_PORT'),
        username: configService.get<string>('SCHOOL_SYSTEM_DB_USER'),
        password: configService.get<string>('SCHOOL_SYSTEM_DB_PASSWORD'),
        database: configService.get<string>('SCHOOL_SYSTEM_DB'),
        entities: [ClassEntity, StudentEntity],
        synchronize: true,
      }),
    }),
    StudentModule,
    ClassModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
