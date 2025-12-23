import { ClassModel } from '../../../domain/class.model';

export abstract class ClassRepositoryPort {
  abstract getAllClasses(): Promise<ClassModel[]>;
}
