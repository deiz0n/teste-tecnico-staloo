import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { StudentModel } from '../../../../domain/student.model';
import { ClassEntity } from '../../../../../class/infrastructure/adapters/out/persistence/class.entity';

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

  @ManyToMany(() => ClassEntity, (classEntity) => classEntity.students)
  classes: ClassEntity[];

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
