import { Module } from '@nestjs/common';
import { AcademicRecordService } from './academic-record.service';
import { AcademicRecordController } from './academic-record.controller';

@Module({
  controllers: [AcademicRecordController],
  providers: [AcademicRecordService],
})
export class AcademicRecordModule {}
