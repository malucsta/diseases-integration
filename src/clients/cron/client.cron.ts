import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FileHelper } from '../../common/util/fileHelper';
import { DiseaseService } from '../disease/services/disease.service';
import { FilesService } from '../files/services/files.service';
import config from '../../../config/default';
import { CronError } from 'src/common/errors/types/cron.error';

@Injectable()
export class ClientCron {
  private readonly fileHelper: FileHelper = new FileHelper();

  constructor(
    private readonly fileService: FilesService,
    private readonly diseaseService: DiseaseService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_7PM)
  async handler() {
    try {
      let fileInfo = await this.createFileToSend(config.firstcountryArray);
      let buffer = this.fileHelper.selectFile(fileInfo.filepath);
      await this.fileService.sendFile(
        buffer,
        fileInfo.filename,
        config.folder_USABR,
      );

      fileInfo = await this.createFileToSend(config.secondcountryArray);
      buffer = this.fileHelper.selectFile(fileInfo.filepath);
      await this.fileService.sendFile(
        buffer,
        fileInfo.filename,
        config.folder_RUCH,
      );
    } catch (error) {
      throw new CronError(error);
    }
  }

  async createFileToSend(countries: string[]) {
    const data = countries.map(async (country) => {
      return await this.diseaseService.fetchInfo(country);
    });

    return this.fileHelper.jsonToCSV(await Promise.all(data));
  }
}
