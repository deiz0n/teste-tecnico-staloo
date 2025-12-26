import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from './class.entity';
import { Repository } from 'typeorm';
import { ClassModel } from '../../../../domain/class.model';
import { ClassRepositoryPort } from '../../../../application/ports/out/class.repository.port';

@Injectable()
export class TypeOrmClassAdapter implements ClassRepositoryPort {
  constructor(
    @InjectRepository(ClassEntity)
    private readonly repository: Repository<ClassEntity>,
  ) {}

  async getAllClasses(): Promise<ClassModel[]> {
    const classes = await this.repository.find();
    return classes.map((classEntity) => classEntity.toDomain());
  }
}
