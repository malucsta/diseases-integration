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
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   //host: '0.0.0.0',
    //   port: db.port,
    //   database: db.database,
    //   username: db.username,
    //   password: db.password,
    //   entities: [__dirname + '/**/*.entity{.js, .ts}'],
    //   migrations: ['src/migrations/**/*{.ts,.js}'],
    // }),
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
