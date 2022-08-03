import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { DiseaseService } from '../services/disease.service';
import { ExceptionInterceptor } from '../../../common/errors/interceptors/exception.interceptor';

@Controller('disease')
export class DiseaseController {
  constructor(private readonly diseaseService: DiseaseService) {}
  @Get(':country')
  @UseInterceptors(ExceptionInterceptor)
  async fetchInfo(@Param('country') country: string) {
    return await this.diseaseService.fetchInfo(country);
  }
}
