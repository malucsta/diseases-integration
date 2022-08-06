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

  @Cron(CronExpression.EVERY_DAY_AT_7PM)
  async handler() {
    try {
      const firstFile: FileData = {
        countries: config.firstcountryArray,
        folder: config.folder_USABR,
      };

      const secondFile: FileData = {
        countries: config.secondcountryArray,
        folder: config.folder_RUCH,
      };

      await this.service.sendFiles([firstFile, secondFile]);
      this.logger.log('Finished sending files');
    } catch (error) {
      throw new CronError(error);
    }
  }
}
