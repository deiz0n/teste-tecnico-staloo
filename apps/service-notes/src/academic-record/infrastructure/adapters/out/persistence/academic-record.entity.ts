import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { SubjectEntity } from '../../../../../subject/infrastructure/adapters/out/persistence/subject.entity';

@Entity('tb_academic_record')
@Index(['student_id', 'subject'])
export class AcademicRecordEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  student_id: string;

  @ManyToOne(() => SubjectEntity)
  @JoinColumn({ name: 'subject_id' })
  subject: SubjectEntity;

  @Column({ type: 'numeric', precision: 5, scale: 2, default: 0 })
  final_grade: number;

  @Column({ type: 'boolean', default: false })
  passed: boolean;
}
