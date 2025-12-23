import { Controller, HttpStatus } from '@nestjs/common';
import { GetAllClassesUseCase } from '../../../../application/ports/in/get-all-classes.use-case';

@Controller('class')
export class ClassController {
  constructor(private readonly getAllClassesUseCase: GetAllClassesUseCase) {}

  async getAll() {
    const data = await this.getAllClassesUseCase.execute();
    return {
      status: HttpStatus.OK,
      timestamp: new Date().toISOString(),
      data: data,
    };
  }
}
