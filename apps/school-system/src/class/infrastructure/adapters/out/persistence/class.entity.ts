import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ClassModel } from '../../../../domain/class.model';

@Entity('tb_class')
export class ClassEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

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
