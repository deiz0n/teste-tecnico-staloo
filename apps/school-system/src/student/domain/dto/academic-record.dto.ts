import { ResponseServiceNotesDto } from './response-service-notes.dto';

export class AcademicRecordDto {
  constructor(
    public readonly studantName: string,
    public readonly academicRecords: ResponseServiceNotesDto[],
  ) {}
}
