import { ExamModel } from '../../exam/domain/exam.model';
import { SubjectModel } from '../../subject/domain/subject.model';

export class AcademicRecordModel {
  constructor(
    public readonly id: string,
    public studentId: string,
    public subject: SubjectModel,
    public exams: ExamModel[] = [],
    public finalGrade: number = 0,
    public passed: boolean = false,
  ) {}
}
