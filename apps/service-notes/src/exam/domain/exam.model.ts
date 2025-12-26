import { SubjectModel } from '../../subject/domain/subject.model';

export class ExamModel {
  constructor(
    public readonly id: string,
    public score: number,
    public date: Date,
    public student_id: string,
    public subject: SubjectModel,
  ) {}
}
