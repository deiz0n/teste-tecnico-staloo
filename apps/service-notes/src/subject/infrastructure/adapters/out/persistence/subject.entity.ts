import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ExamEntity } from '../../../../../exam/infrastructure/adapters/out/persistence/exam.entity';
import { SubjectModel } from '../../../../domain/subject.model';

@Entity('tb_subject')
export class SubjectEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'int' })
  workload: number;

  @OneToMany(() => ExamEntity, (ExamEntity) => ExamEntity.subject)
  exams: ExamEntity[];

  toDomain(): SubjectModel {
    return new SubjectModel(this.id, this.name, this.workload, this.exams);
  }
}
