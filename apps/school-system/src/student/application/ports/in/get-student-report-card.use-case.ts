import { AcademicRecordDto } from '../../../domain/dto/academic-record.dto';

export abstract class GetStudentReportCardUseCase {
  abstract execute(studentId: string): Promise<AcademicRecordDto>;
}
