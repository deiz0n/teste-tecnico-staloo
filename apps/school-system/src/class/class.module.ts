import { Module } from '@nestjs/common';
import { ClassController } from './infrastructure/adapters/in/web/class.controller';
import { GetAllClassesUseCase } from './application/ports/in/get-all-classes.use-case';
import { GetAllClassesService } from './application/services/get-all-classes.service';
import { ClassRepositoryPort } from './application/ports/out/class.repository.port';
import { TypeOrmClassAdapter } from './infrastructure/adapters/out/persistence/typeorm-class.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from './infrastructure/adapters/out/persistence/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassEntity])],
  controllers: [ClassController],
  providers: [
    { provide: GetAllClassesUseCase, useClass: GetAllClassesService },
    { provide: ClassRepositoryPort, useClass: TypeOrmClassAdapter },
  ],
})
export class ClassModule {}
