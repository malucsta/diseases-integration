import { Module } from '@nestjs/common';
import { DiseaseController } from './disease/controllers/disease.controller';
import { DiseaseService } from './disease/services/disease.service';

@Module({
  controllers: [DiseaseController],
  providers: [DiseaseService],
})
export class ClientsModule {}
