import { Module } from '@nestjs/common';
import { ClientsModule } from 'src/disease-goFile/clients/clients.module';
import { DiseaseGoFileService } from './services/diseaseGofile.service';
import { TaskCron } from './tasks/task.cron';

@Module({
  imports: [ClientsModule],
  providers: [DiseaseGoFileService, TaskCron],
})
export class DiseaseGoFileModule {}
