import { ClassModel } from '../../../domain/class.model';

export abstract class GetAllClassesUseCase {
  abstract execute(): Promise<ClassModel[]>;
}
