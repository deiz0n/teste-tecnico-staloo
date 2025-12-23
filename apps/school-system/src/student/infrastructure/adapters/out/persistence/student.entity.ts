import { Column, Entity, PrimaryColumn } from 'typeorm';
import { StudentModel } from '../../../../domain/student.model';

@Entity('tb_student')
export class StudentEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ type: 'text' })
  address: string;

  @Column()
  dateBirth: Date;

  static fromDomain(studentModel: StudentModel): StudentEntity {
    const entity = new StudentEntity();
    entity.id = studentModel.id;
    entity.name = studentModel.name;
    entity.cpf = studentModel.cpf;
    entity.address = studentModel.address;
    entity.dateBirth = studentModel.dateBirth;
    return entity;
  }

  toDomain(): StudentModel {
    return new StudentModel(
      this.id,
      this.name,
      this.cpf,
      this.address,
      this.dateBirth,
    );
  }
}
