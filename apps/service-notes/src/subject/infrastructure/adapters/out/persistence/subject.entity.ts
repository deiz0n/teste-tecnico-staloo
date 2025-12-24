import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ExamEntity } from '../../../../../exam/infrastructure/adapters/out/persistence/exam.entity';

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
}
