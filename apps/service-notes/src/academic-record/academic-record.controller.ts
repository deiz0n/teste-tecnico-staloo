import { Controller } from '@nestjs/common';
import { AcademicRecordService } from './academic-record.service';

@Controller('academic-record')
export class AcademicRecordController {
  constructor(private readonly academicRecordService: AcademicRecordService) {}
}
