import { ClassModel } from '../../../src/class/domain/class.model';
import { randomUUID } from 'crypto';

describe('ClassModel', () => {
  describe('Constructor', () => {
    it('should create a class with all properties correctly', () => {
      const id = randomUUID();
      const name = 'Turma A';
      const location = 'Sala 101';

      const classModel = new ClassModel(id, name, location);

      expect(classModel.id).toBe(id);
      expect(classModel.name).toBe(name);
      expect(classModel.location).toBe(location);
    });

    it('should have readonly id property', () => {
      const id = randomUUID();
      const classModel = new ClassModel(id, 'Turma A', 'Sala 101');

      expect(classModel.id).toBe(id);
    });

    it('should allow modification of mutable properties', () => {
      const classModel = new ClassModel(randomUUID(), 'Turma A', 'Sala 101');

      classModel.name = 'Turma B';
      classModel.location = 'Sala 202';

      expect(classModel.name).toBe('Turma B');
      expect(classModel.location).toBe('Sala 202');
    });

    it('should create multiple classes with unique ids', () => {
      const class1 = new ClassModel(randomUUID(), 'Turma A', 'Sala 101');
      const class2 = new ClassModel(randomUUID(), 'Turma B', 'Sala 102');

      expect(class1.id).not.toBe(class2.id);
    });

    it('should handle empty strings for name and location', () => {
      const classModel = new ClassModel(randomUUID(), '', '');

      expect(classModel.name).toBe('');
      expect(classModel.location).toBe('');
    });
  });
});
