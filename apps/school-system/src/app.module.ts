import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { ClassModule } from './class/class.module';

@Module({
  imports: [StudentModule, ClassModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
