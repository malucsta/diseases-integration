import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data';
import { GoFileResponse } from '../models/goFile';
import config from '../../../../../config/default';
import { FileResponseError } from 'src/common/errors/types/files.error';
import * as HTTPUtil from '../../../../common/util/request';
import { ClientRequestError } from 'src/common/errors/types/client.error';

@Injectable()
export class GoFileService {
  private async getServer(): Promise<string> {
    const url = `https://api.gofile.io/getServer`;

    return await axios(url).then((response) => {
      return response.data.data.server;
    });
  }

  async sendFile(
    fileBuffer: Buffer,
    fileName: string,
    folder: string,
  ): Promise<GoFileResponse> {
    try {
      const server = await this.getServer();
      const pathAPI = `https://${server}.gofile.io/uploadFile`;

      const formData = this.generateFormData(fileBuffer, fileName, folder);

      const respose = await axios.post(pathAPI, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data: GoFileResponse = {
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
    fileBuffer: Buffer,
    fileName: string,
    folder: string,
  ): FormData {
    const formData = new FormData();

    formData.append('token', config.goFileToken);
    formData.append('folderId', folder);
    formData.append('file', fileBuffer, {
      filename: fileName,
    });

    return formData;
  }
}
