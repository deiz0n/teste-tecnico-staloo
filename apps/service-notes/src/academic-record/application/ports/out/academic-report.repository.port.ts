import { AcademicRecordModel } from '../../../domain/academic-record.model';

export abstract class AcademicReportRepositoryPort {
  abstract getStudentReportCardUseCase(
    studentId: string,
  ): Promise<AcademicRecordModel[]>;
  abstract save(model: AcademicRecordModel): Promise<AcademicRecordModel>;
}
