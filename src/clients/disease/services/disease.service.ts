import { Injectable } from '@nestjs/common';
import axios from 'axios';
import config from '../../../../config/default';
import { DiseaseResponseError } from '../../../common/errors/types/disease.error';
import { DiseaseInfo, DiseaseResponse } from '../models/disease';
import { ClientRequestError } from 'src/common/errors/types/client.error';
import * as HTTPUtil from '../../../common/util/request';

@Injectable()
export class DiseaseService {
  public async fetchInfo(country: string) {
    try {
      const data: DiseaseResponse = await axios(
        `${config.baseURL}${country}`,
      ).then((response) => {
        return response.data;
      });

      return this.normalizeResponse(data);
    } catch (err) {
      if (err instanceof Error && HTTPUtil.Request.isRequestError(err))
        throw new DiseaseResponseError(err);

      throw new ClientRequestError(err, 'Disease.sh');
    }
  }

  private normalizeResponse(response: DiseaseResponse): DiseaseInfo {
    if (this.isValidResponse(response)) {
      return {
        country: response.country,
        todayCases: response.todayCases,
        todayDeaths: response.todayDeaths,
        date: new Date(Date.now()).toLocaleDateString('pt-BR'),
        active: response.active,
        critical: response.critical,
      };
    }

    throw Error;
  }

  private isValidResponse(response: DiseaseResponse): boolean {
    return !!(
      response.country != null &&
      response.todayCases != null &&
      response.todayDeaths != null &&
      response.active != null &&
      response.critical != null
    );
  }
}
