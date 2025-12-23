import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { GetStudentsByClassUseCase } from '../../../../application/ports/in/get-students-by-class.use-case';

@Controller('students')
export class StudentController {
  constructor(
    private readonly getStudentsByClassUseCase: GetStudentsByClassUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getByClass(@Query('classId') classId: string) {
    const data = await this.getStudentsByClassUseCase.execute(classId);
    return {
      timestamp: new Date().toISOString(),
      data: data,
    };
  }
}
