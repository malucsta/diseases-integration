import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import { FileResponse } from '../models/file';
import config from '../../../../config/default';
import { FileResponseError } from 'src/common/errors/types/files.error';
import * as HTTPUtil from '../../../common/util/request';
import { ClientRequestError } from 'src/common/errors/types/client.error';

@Injectable()
export class FilesService {
  private async getServer(): Promise<string> {
    return await axios(`https://api.gofile.io/getServer`).then((response) => {
      return response.data.data.server;
    });
  }

  async sendFile(
    file: Express.Multer.File,
    folder: string,
  ): Promise<FileResponse> {
    try {
      const server = await this.getServer();
      const pathAPI = `https://${server}.gofile.io/uploadFile`;

      const formData = this.generateFormData(file, folder);

      const respose = await axios.post(pathAPI, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data: FileResponse = {
        status: respose.data.status,
        data: respose.data.data,
      };

      if (data.status != 'ok') throw new Error(data.status);

      return data;
    } catch (err) {
      if (err instanceof Error && HTTPUtil.Request.isRequestError(err))
        throw new FileResponseError(err);
      throw new ClientRequestError(err, 'GoFile');
    }
  }

  private generateFormData(
    file: Express.Multer.File,
    folder: string,
  ): FormData {
    const formData = new FormData();
    formData.append('token', config.goFileToken);
    formData.append('folderId', folder);
    formData.append('file', file.buffer, {
      filename: file.originalname,
    });

    return formData;
  }
}
