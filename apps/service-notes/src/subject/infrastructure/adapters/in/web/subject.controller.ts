import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { GetAllByStudentUseCase } from '../../../../application/ports/in/get-all-by-student.use-case';

@Controller('subjects')
export class SubjectController {
  constructor(
    private readonly getAllByStudentUseCase: GetAllByStudentUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllByStudent(@Query('studentId') studentId: string) {
    return this.getAllByStudentUseCase.execute(studentId);
  }
}
