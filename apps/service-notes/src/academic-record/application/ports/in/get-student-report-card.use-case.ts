import { AcademicRecordModel } from '../../../domain/academic-record.model';

export abstract class GetStudentReportCardUseCase {
  abstract execute(studentId: string): Promise<AcademicRecordModel[]>;
}
