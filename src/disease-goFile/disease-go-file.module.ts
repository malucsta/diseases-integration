import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiseaseService } from './clients/disease/services/disease.service';
import { GoFileService } from './clients/goFile/services/goFile.service';
import { FileLogEntity } from './entities/fileLog.entity';
import { DiseaseGoFileService } from './services/diseaseGofile.service';
import { TaskCron } from './tasks/task.cron';

@Module({
  imports: [TypeOrmModule.forFeature([FileLogEntity])],
  providers: [DiseaseService, GoFileService, DiseaseGoFileService, TaskCron],
})
export class DiseaseGoFileModule {}
