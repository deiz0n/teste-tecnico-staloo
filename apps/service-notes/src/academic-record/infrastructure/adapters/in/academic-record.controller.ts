import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { GetStudentReportCardUseCase } from '../../../application/ports/in/get-student-report-card.use-case';

@Controller('academic-records')
export class AcademicRecordController {
  constructor(
    private readonly getStudentReportCardUseCase: GetStudentReportCardUseCase,
  ) {}

  @Get('student/:studentId')
  @HttpCode(HttpStatus.OK)
  getStudentReportCard(@Param('studentId', ParseUUIDPipe) studentId: string) {
    return this.getStudentReportCardUseCase.execute(studentId);
  }
}
