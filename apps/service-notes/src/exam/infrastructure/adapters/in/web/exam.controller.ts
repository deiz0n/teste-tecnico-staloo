import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { GetAllByStudentUseCase } from '../../../../application/ports/in/get-all-by-student.use-case';

@Controller('exams')
export class ExamController {
  constructor(
    private readonly getAllByStudentUseCase: GetAllByStudentUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllByStudent(@Query('studentId', ParseUUIDPipe) studentId: string) {
    const data = await this.getAllByStudentUseCase.execute(studentId);
    return {
      timestamp: new Date().toISOString(),
      data: data,
    };
  }
}
