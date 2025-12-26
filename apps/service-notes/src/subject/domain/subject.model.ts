import { ExamModel } from '../../exam/domain/exam.model';

export class SubjectModel {
  constructor(
    public readonly id: string,
    public name: string,
    public workload: number,
    public exams: ExamModel[],
  ) {}
}
