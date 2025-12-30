import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { SubjectEntity } from '../../../../../subject/infrastructure/adapters/out/persistence/subject.entity';
import { ExamModel } from '../../../../domain/exam.model';

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

  toDomain(): ExamModel {
    return new ExamModel(
      this.id,
      this.score,
      this.date,
      this.student_id,
      this.subject,
    );
  }

  static fromDomain(model: ExamModel): ExamEntity {
    const entity = new ExamEntity();
    entity.id = model.id;
    entity.score = model.score;
    entity.date = model.date;
    entity.student_id = model.student_id;

    if (model.subject) entity.subject = SubjectEntity.fromDomain(model.subject);

    return entity;
  }
}
