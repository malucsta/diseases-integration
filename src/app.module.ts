import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiseaseGoFileModule } from './disease-goFile/disease-go-file.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { DataSource } from 'typeorm';
import source from 'datasource';

@Module({
  imports: [
    DiseaseGoFileModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(config),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: DataSource,
      useFactory: async () => {
        await source.initialize();
        return source;
      },
    },
  ],
})
export class AppModule {}
