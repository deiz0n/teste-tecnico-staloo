import { SubjectDto } from './subject.dto';

export class ReportCardDto {
  constructor(
    public readonly studentId: string,
    public readonly studentName: string,
    public readonly subjects: SubjectDto[],
  ) {}
}
