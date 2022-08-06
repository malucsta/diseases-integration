import { Module } from '@nestjs/common';
import { DiseaseService } from './clients/disease/services/disease.service';
import { GoFileService } from './clients/goFile/services/goFile.service';
import { DiseaseGoFileService } from './services/diseaseGofile.service';
import { TaskCron } from './tasks/task.cron';

@Module({
  providers: [DiseaseService, GoFileService, DiseaseGoFileService, TaskCron],
})
export class DiseaseGoFileModule {}
