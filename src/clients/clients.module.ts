import { Module } from '@nestjs/common';
import { ClientCron } from './cron/client.cron';
import { DiseaseController } from './disease/controllers/disease.controller';
import { DiseaseService } from './disease/services/disease.service';
import { FilesController } from './files/controllers/files.controller';
import { FilesService } from './files/services/files.service';

@Module({
  controllers: [DiseaseController, FilesController],
  providers: [DiseaseService, FilesService, ClientCron],
})
export class ClientsModule {}
