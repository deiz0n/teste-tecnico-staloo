import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassEntity } from './class.entity';
import { Repository } from 'typeorm';
import { ClassModel } from '../../../../domain/class.model';
import { ClassRepositoryPort } from '../../../../application/ports/out/class.repository.port';

@Injectable()
export class TypeOrmClassAdapter implements ClassRepositoryPort {
  private readonly logger = new Logger(TypeOrmClassAdapter.name);

  constructor(
    @InjectRepository(ClassEntity)
    private readonly repository: Repository<ClassEntity>,
  ) {}

  async getAllClasses(): Promise<ClassModel[]> {
    this.logger.log('Querying all classes from database');
    const classes = await this.repository.find();
    this.logger.log(`Found ${classes.length} classes in database`);
    return classes.map((classEntity) => classEntity.toDomain());
  }
}
