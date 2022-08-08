import * as fs from 'fs';
import { createObjectCsvWriter } from 'csv-writer';
import config from '../../../config/default';
import { rmdir, unlink } from 'fs';
import { randomUUID } from 'crypto';

export interface FileInfo {
  filename: string;
  filepath: string;
}

export class FileHelper {
  /**
   * Generates CSV from object array and returns filename and filepath
   */

  // eslint-disable-next-line @typescript-eslint/ban-types
  static async jsonToCSV(json: Object[]): Promise<FileInfo> {
    const filename = this.generateFileName();
    const directory = config.csvFolder;
    const filepath = `${directory}\\${filename}`;
    const header = this.generateHeader(json[0]);

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }

    const csvWriter = createObjectCsvWriter({
      path: filepath,
      header: header,
    });

    await csvWriter.writeRecords(json);

    return {
      filename: filename,
      filepath: filepath,
    };
  }

  private static generateFileName() {
    return randomUUID() + '.csv';
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private static generateHeader(json: Object) {
    const header = [];
    Object.keys(json).map((item) => header.push({ id: item, title: item }));
    return header;
  }

  static selectFile(filepath: string): Buffer {
    return fs.readFileSync(filepath);
  }

  static deleteFile(path: string) {
    unlink(path, (err) => {
      if (err) throw Error(`Error while deleting file. Path: ${path}`);
    });
  }

  static deleteFolder(path: string) {
    rmdir(path, (err) => {
      if (err) throw Error(`Error while deleting folder. Path: ${path}`);
    });
  }
}
