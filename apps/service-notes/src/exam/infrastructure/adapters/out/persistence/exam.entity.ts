import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { SubjectEntity } from '../../../../../subject/infrastructure/adapters/out/persistence/subject.entity';

@Entity('tb_exam')
export class ExamEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'numeric' })
  score: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'uuid' })
  student_id: string;

  @ManyToOne(() => SubjectEntity, (subjectEntity) => subjectEntity.exams)
  subject: SubjectEntity;
}
