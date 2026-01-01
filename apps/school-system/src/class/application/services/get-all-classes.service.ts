import { Inject, Logger } from '@nestjs/common';
import { ClassModel } from '../../domain/class.model';
import { GetAllClassesUseCase } from '../ports/in/get-all-classes.use-case';
import { ClassRepositoryPort } from '../ports/out/class.repository.port';

export class GetAllClassesService implements GetAllClassesUseCase {
  private readonly logger = new Logger(GetAllClassesService.name);

  constructor(
    @Inject(ClassRepositoryPort)
    private readonly repository: ClassRepositoryPort,
  ) {}

  async execute(): Promise<ClassModel[]> {
    this.logger.log('Executing get all classes');
    const classes = await this.repository.getAllClasses();
    this.logger.log(`Retrieved ${classes.length} classes`);
    return classes;
  }
}
