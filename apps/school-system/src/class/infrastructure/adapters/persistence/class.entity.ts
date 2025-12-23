import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Class } from '../../../domain/class.model';

@Entity('tb_class')
class ClassEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  static fromDomain(domain: Class): ClassEntity {
    const entity = new ClassEntity();
    entity.id = domain.id;
    entity.name = domain.name;
    entity.location = domain.location;
    return entity;
  }

  toDomain(): Class {
    return new Class(this.id, this.name, this.location);
  }
}
