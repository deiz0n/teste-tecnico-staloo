import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { SubjectEntity } from '../../../../../subject/infrastructure/adapters/out/persistence/subject.entity';
import { AcademicRecordModel } from '../../../../domain/academic-record.model';

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

  toDomain(): AcademicRecordModel {
    return new AcademicRecordModel(
      this.id,
      this.student_id,
      this.subject,
      [],
      this.final_grade,
      this.passed,
    );
  }

  static fromDomain(model: AcademicRecordModel): AcademicRecordEntity {
    const entity = new AcademicRecordEntity();
    entity.id = model.id;
    entity.student_id = model.studentId;

    if (model.subject) entity.subject = SubjectEntity.fromDomain(model.subject);

    entity.final_grade = model.finalGrade;
    entity.passed = model.passed;
    return entity;
  }
}
