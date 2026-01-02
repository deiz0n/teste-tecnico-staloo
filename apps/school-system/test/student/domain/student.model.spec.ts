import { randomUUID } from 'crypto';
import { StudentModel } from '../../../src/student/domain/student.model';

describe('StudentModel', () => {
  describe('Constructor', () => {
    it('should create a student with all properties correctly', () => {
      const id = randomUUID();
      const name = 'John Doe';
      const cpf = '12345678900';
      const address = 'Rua Exemplo, 123';
      const dateBirth = new Date('2000-01-01');

      const student = new StudentModel(id, name, cpf, address, dateBirth);

      expect(student.id).toBe(id);
      expect(student.name).toBe(name);
      expect(student.cpf).toBe(cpf);
      expect(student.address).toBe(address);
      expect(student.dateBirth).toBe(dateBirth);
    });

    it('should have readonly id property', () => {
      const id = randomUUID();
      const student = new StudentModel(
        id,
        'John Doe',
        '12345678900',
        'Rua Exemplo, 123',
        new Date('2000-01-01'),
      );

      expect(student.id).toBe(id);
    });

    it('should allow modification of mutable properties', () => {
      const student = new StudentModel(
        randomUUID(),
        'John Doe',
        '12345678900',
        'Rua Exemplo, 123',
        new Date('2000-01-01'),
      );

      student.name = 'Jane Doe';
      student.cpf = '98765432100';
      student.address = 'Nova Rua, 456';
      student.dateBirth = new Date('1999-05-15');

      expect(student.name).toBe('Jane Doe');
      expect(student.cpf).toBe('98765432100');
      expect(student.address).toBe('Nova Rua, 456');
      expect(student.dateBirth).toEqual(new Date('1999-05-15'));
    });
  });
});
