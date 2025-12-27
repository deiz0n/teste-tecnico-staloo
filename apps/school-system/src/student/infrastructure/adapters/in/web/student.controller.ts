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
import { GenerateReportCardUseCase } from '../../../../application/ports/in/generate-report-card.use-case';

@Controller('students')
export class StudentController {
  constructor(
    private readonly getStudentsByClassUseCase: GetStudentsByClassUseCase,
    private readonly generateReportCardUseCase: GenerateReportCardUseCase,
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
    const data = await this.generateReportCardUseCase.execute(studentId);
    return {
      timestamp: new Date().toISOString(),
      date: data,
    };
  }
}
