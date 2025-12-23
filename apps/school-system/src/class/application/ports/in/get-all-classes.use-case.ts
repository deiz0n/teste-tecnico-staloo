import { Class } from '../../../domain/class.model';

export abstract class GetAllClassesUseCase {
  abstract execute(): Promise<Class[]>;
}
