import { Injectable, Logger } from '@nestjs/common';
import { FileHelper, FileInfo } from 'src/common/util/fileHelper';
import config from '../../../config/default';
import { DiseaseService } from '../clients/disease/services/disease.service';
import { GoFileService } from '../clients/goFile/services/goFile.service';

export type FilesToExport = Array<FileData>;
export interface FileData {
  countries: string[];
  folder: string;
}

@Injectable()
export class DiseaseGoFileService {
  private readonly logger = new Logger(DiseaseGoFileService.name);

  constructor(
    private readonly diseaseService: DiseaseService,
    private readonly fileService: GoFileService,
  ) {}

  async sendFiles(files: FilesToExport) {
    for (const array of files) {
      const fileInfo = await this.createFileToSend(array.countries);
      const buffer = FileHelper.selectFile(fileInfo.filepath);

      this.logger.log(`Sending file: ${fileInfo.filename}`);
      await this.fileService.sendFile(buffer, fileInfo.filename, array.folder);

      FileHelper.deleteFile(fileInfo.filepath);
    }

    FileHelper.deleteFolder(config.csvFolder);
  }

  async createFileToSend(countries: string[]): Promise<FileInfo> {
    const data = countries.map(async (country) => {
      return await this.diseaseService.fetchInfo(country);
    });

    return FileHelper.jsonToCSV(await Promise.all(data));
  }
}
