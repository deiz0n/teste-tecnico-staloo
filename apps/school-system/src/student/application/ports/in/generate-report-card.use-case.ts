import { AcademicRecordDto } from '../../../domain/dto/academic-record.dto';

export abstract class GenerateReportCardUseCase {
  abstract execute(studentId: string): Promise<AcademicRecordDto>;
}
