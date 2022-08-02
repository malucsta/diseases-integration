import { Injectable } from '@nestjs/common';
import axios from 'axios';
import config from '../../../../config/default';
import {
  ClientRequestError,
  DiseaseResponseError,
} from '../errors/disease.error';
import { DiseaseInfo, DiseaseResponse } from '../models/disease';
import * as HTTPUtil from '../../../util/request';

@Injectable()
export class DiseaseService {
  public async fetchInfo(country: string) {
    try {
      country = this.normalizeCountry(country);

      const data: DiseaseResponse = await axios(
        `${config.baseURL}${country}`,
      ).then((response) => {
        return response.data;
      });

      return this.normalizeResponse(data);
    } catch (err) {
      if (err instanceof Error && HTTPUtil.Request.isRequestError(err)) {
        const error = HTTPUtil.Request.extractErrorData(err);
        throw new DiseaseResponseError(error);
      } else {
        if (err.code) throw new ClientRequestError(err.code);
        throw new ClientRequestError(err);
      }
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

  private normalizeCountry(country: string): string {
    country = country.toLowerCase();

    switch (country) {
      case 'usa':
        return country;

      case 'eua':
        return 'usa';

      case 'estadosunidos':
        return 'usa';

      case 'unitedstates':
        return 'usa';

      case 'brazil':
        return country;

      case 'br':
        return 'brazil';

      case 'brasil':
        return 'brazil';

      case 'china':
        return country;

      case 'cn':
        return 'china';

      case 'russia':
        return country;

      case 'ru':
        return 'russia';

      default:
        return null;
    }
  }
}
