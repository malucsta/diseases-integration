import { DiseaseInfo } from 'src/clients/disease/models/disease';
import * as fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';

export class FileHelper {
  /**
   * Generates CSV from DiseaseInfo object array and returns filename and filepath
   */

  public async jsonToCSV(json: DiseaseInfo[]) {
    const filename = this.generateFileName(json);
    const filepath = process.cwd().concat(`\\csv\\${filename}`);
    const header = this.generateHeader(json);

    const csvWriter = createObjectCsvWriter({
      path: filepath,
      header: header,
    });

    await csvWriter.writeRecords(json);

    return { filename: filename, filepath: filepath };
  }

  private generateFileName(json: DiseaseInfo[]) {
    let fileName = '';
    json.forEach((object) => {
      fileName = fileName + object.country;
    });

    fileName = fileName + '.csv';
    return fileName;
  }

  private generateHeader(json: DiseaseInfo[]) {
    const header = [];
    Object.keys(json[0]).map((item) => header.push({ id: item, title: item }));
    return header;
  }

  public selectFile(filepath: string): Buffer {
    return fs.readFileSync(filepath);
  }
}
