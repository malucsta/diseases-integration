import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from '../services/files.service';
import { Express } from 'express';
import { FileResponse } from '../models/file';
import { ExceptionInterceptor } from 'src/common/errors/interceptors/exception.interceptor';

@Controller('files')
@UseInterceptors(ExceptionInterceptor)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload/:folder')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('folder') folder: string,
  ): Promise<FileResponse> {
    return await this.filesService.sendFile(
      file.buffer,
      file.originalname,
      folder,
    );
  }
}
