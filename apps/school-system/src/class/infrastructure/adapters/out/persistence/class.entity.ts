import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { ClassModel } from '../../../../domain/class.model';
import { StudentEntity } from '../../../../../student/infrastructure/adapters/out/persistence/student.entity';

@Entity('tb_class')
export class ClassEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @ManyToMany(() => StudentEntity, (studentEntity) => studentEntity.classes)
  @JoinTable({
    name: 'tb_student_class',
    joinColumn: {
      name: 'class_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'student_id',
      referencedColumnName: 'id',
    },
  })
  students: StudentEntity[];

  static fromDomain(classModel: ClassModel): ClassEntity {
    const entity = new ClassEntity();
    entity.id = classModel.id;
    entity.name = classModel.name;
    entity.location = classModel.location;
    return entity;
  }

  toDomain(): ClassModel {
    return new ClassModel(this.id, this.name, this.location);
  }
}
