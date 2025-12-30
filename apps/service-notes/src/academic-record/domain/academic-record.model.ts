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

  public updatePerformance(): void {
    const examsToCalculate = this.subject?.exams?.length
      ? this.subject.exams
      : this.exams;

    if (!examsToCalculate || examsToCalculate.length === 0) {
      this.finalGrade = 0;
      this.passed = false;
      return;
    }

    const total = examsToCalculate.reduce(
      (sum, exam) => sum + Number(exam.score),
      0,
    );

    const average = total / examsToCalculate.length;

    this.finalGrade = Number(average.toFixed(2));
    this.passed = this.finalGrade >= 7.0;
  }
}
