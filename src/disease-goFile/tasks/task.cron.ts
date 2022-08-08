import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import config from '../../../config/default';
import { CronError } from 'src/common/errors/types/cron.error';
import {
  FileData,
  DiseaseGoFileService,
} from '../services/diseaseGofile.service';

@Injectable()
export class TaskCron {
  private readonly logger = new Logger(TaskCron.name);

  constructor(private readonly service: DiseaseGoFileService) {}

  @Cron(CronExpression.EVERY_DAY_AT_7PM, {
    timeZone: 'America/Sao_Paulo',
  })
  async handler() {
    try {
      if ((await this.service.checkFileLog()) != 0)
        throw new Error('Files already exported for today');

      const firstFile: FileData = {
        countries: config.firstcountryArray,
        folder: config.folder_USABR,
      };

      const secondFile: FileData = {
        countries: config.secondcountryArray,
        folder: config.folder_RUCH,
      };

      const fileArray = [firstFile, secondFile];

      await this.service.sendFiles(fileArray);
      this.logger.log('Finished sending files');
      await this.service.checkFileLog(fileArray.length);
    } catch (error) {
      throw new CronError(error);
    }
  }
}
