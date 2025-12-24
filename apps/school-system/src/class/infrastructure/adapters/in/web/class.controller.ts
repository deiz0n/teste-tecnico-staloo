import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { GetAllClassesUseCase } from '../../../../application/ports/in/get-all-classes.use-case';

@Controller('classes')
export class ClassController {
  constructor(private readonly getAllClassesUseCase: GetAllClassesUseCase) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    const data = await this.getAllClassesUseCase.execute();
    return {
      timestamp: new Date().toISOString(),
      data: data,
    };
  }
}
