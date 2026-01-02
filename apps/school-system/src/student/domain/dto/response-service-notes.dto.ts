import { SubjectDto } from './subject.dto';

export class ResponseServiceNotesDto {
  constructor(
    public readonly subjects: SubjectDto[],
    public readonly finalGrade: number,
    public readonly passed: boolean,
  ) {}
}
