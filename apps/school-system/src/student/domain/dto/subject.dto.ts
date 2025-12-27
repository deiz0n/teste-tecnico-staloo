import { ExamDto } from './exam.dto';

export class SubjectDto {
  constructor(
    public readonly name: string,
    public readonly workload: number,
    public readonly exams: ExamDto[],
  ) {}
}
