import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from './class.entity';
import { Repository } from 'typeorm';
import { Class } from '../../../../domain/class.model';
import { ClassRepositoryPort } from '../../../../application/ports/out/class.repository.port';

@Injectable()
export class TypeOrmClassAdapter implements ClassRepositoryPort {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly repository: Repository<ClassEntity>,
  ) {}

  getAllClasses(): Promise<Class[]> {
    return this.repository.find();
  }
}
