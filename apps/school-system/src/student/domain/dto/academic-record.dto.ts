import { SubjectDto } from './subject.dto';

export class AcademicRecordDto {
  constructor(
    public readonly studentName: string,
    public readonly subjects: SubjectDto[],
  ) {}
}
