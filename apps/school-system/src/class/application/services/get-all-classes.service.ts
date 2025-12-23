import { Inject } from '@nestjs/common';
import { Class } from '../../domain/class.model';
import { GetAllClassesUseCase } from '../ports/in/get-all-classes.use-case';
import { ClassRepositoryPort } from '../ports/out/class.repository.port';

export class GetAllClassesService implements GetAllClassesUseCase {
  constructor(
    @Inject(ClassRepositoryPort)
    private readonly repository: ClassRepositoryPort,
  ) {}

  async execute(): Promise<Class[]> {
    return this.repository.getAllClasses();
  }
}
