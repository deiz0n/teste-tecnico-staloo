import { ReportCardDto } from '../../../domain/dto/report-card.dto';

export abstract class GenerateReportCardUseCase {
  abstract execute(studentId: string): Promise<ReportCardDto>;
}
