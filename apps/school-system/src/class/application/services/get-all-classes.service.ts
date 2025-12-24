import { Inject } from '@nestjs/common';
import { ClassModel } from '../../domain/class.model';
import { GetAllClassesUseCase } from '../ports/in/get-all-classes.use-case';
import { ClassRepositoryPort } from '../ports/out/class.repository.port';

export class GetAllClassesService implements GetAllClassesUseCase {
  constructor(
    @Inject(ClassRepositoryPort)
    private readonly repository: ClassRepositoryPort,
  ) {}

  async execute(): Promise<ClassModel[]> {
    return this.repository.getAllClasses();
  }
}
