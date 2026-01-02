import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { GetStudentsByClassUseCase } from '../../../../application/ports/in/get-students-by-class.use-case';
import { GetStudentReportCardUseCase } from '../../../../application/ports/in/get-student-report-card.use-case';

@Controller('students')
export class StudentController {
  constructor(
    private readonly getStudentsByClassUseCase: GetStudentsByClassUseCase,
    private readonly getStudentReportCardUseCase: GetStudentReportCardUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getByClass(@Query('classId', ParseUUIDPipe) classId: string) {
    const data = await this.getStudentsByClassUseCase.execute(classId);
    return {
      timestamp: new Date().toISOString(),
      data: data,
    };
  }

  @Get(':studentId/report')
  async generateReportCard(
    @Param('studentId', ParseUUIDPipe) studentId: string,
  ) {
    const data = await this.getStudentReportCardUseCase.execute(studentId);
    return {
      timestamp: new Date().toISOString(),
      date: data,
    };
  }
}
