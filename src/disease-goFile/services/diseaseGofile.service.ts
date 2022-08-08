import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileHelper, FileInfo } from 'src/common/util/fileHelper';
import { formatDate } from 'src/common/util/formatDate';
import { Repository } from 'typeorm';
import config from '../../../config/default';
import { DiseaseService } from '../clients/disease/services/disease.service';
import { GoFileService } from '../clients/goFile/services/goFile.service';
import { FileLogEntity } from '../entities/fileLog.entity';

export type FilesToExport = Array<FileData>;
export interface FileData {
  countries: string[];
  folder: string;
}

@Injectable()
export class DiseaseGoFileService {
  private readonly logger = new Logger(DiseaseGoFileService.name);

  constructor(
    @InjectRepository(FileLogEntity)
    private readonly fileLogRepository: Repository<FileLogEntity>,
    private readonly diseaseService: DiseaseService,
    private readonly fileService: GoFileService,
  ) {}

  async sendFiles(files: FilesToExport) {
    let numberOfFiles = 0;
    for (const array of files) {
      const fileInfo = await this.createFileToSend(array.countries);
      const buffer = FileHelper.selectFile(fileInfo.filepath);

      this.logger.log(`Sending file: ${fileInfo.filename}`);
      await this.fileService.sendFile(buffer, fileInfo.filename, array.folder);

      FileHelper.deleteFile(fileInfo.filepath);
      numberOfFiles++;
    }

    await this.saveFileLog(numberOfFiles);
    FileHelper.deleteFolder(config.csvFolder);
  }

  async createFileToSend(countries: string[]): Promise<FileInfo> {
    const data = countries.map(async (country) => {
      return await this.diseaseService.fetchInfo(country);
    });

    return FileHelper.jsonToCSV(await Promise.all(data));
  }

  async saveFileLog(numberOfFiles: number) {
    const fileLog = this.fileLogRepository.create({
      date: formatDate(),
      exportedFiles: numberOfFiles,
    });

    try {
      await this.fileLogRepository.save(fileLog);
    } catch (error) {
      throw new Error('Error while saving file log');
    }
  }

  async checkFileLog(filesToBeExported?: number) {
    const files = await this.fileLogRepository
      .createQueryBuilder('files')
      .where('files.date = :date', { date: formatDate() })
      .getOne();

    if (filesToBeExported && files.exportedFiles != filesToBeExported)
      throw new Error(
        `Just ${files.exportedFiles} of ${filesToBeExported} files were sent`,
      );

    return files == null ? 0 : files.exportedFiles;
  }
}
