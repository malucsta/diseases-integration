import { Module } from '@nestjs/common';
import { DiseaseService } from './disease/services/disease.service';
import { GoFileService } from './goFile/services/goFile.service';

@Module({
  providers: [DiseaseService, GoFileService],
})
export class ClientsModule {}
