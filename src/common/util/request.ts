import { AxiosError } from 'axios';
import { ErrorResponse } from 'src/common/errors/types/general.error';
import { formatError } from './formatError';

export enum ProviderAPI {
  Disease = 'Disease.sh',
  GoFile = 'GoFile',
  None = 'None',
}

export class Request {
  public static isRequestError(error: Error): boolean {
    return !!(
      (error as AxiosError).response && (error as AxiosError).response?.status
    );
  }

  public static extractErrorData(
    error: unknown,
    providerAPI: ProviderAPI,
  ): ErrorResponse {
    const axiosError = error as AxiosError;

    if (axiosError.response && axiosError.response.status) {
      if (providerAPI === ProviderAPI.Disease)
        return {
          message: formatError(JSON.stringify(axiosError.response.data)),
          code: axiosError.response.status.toString(),
        };

      if (providerAPI == ProviderAPI.GoFile)
        return {
          message: JSON.parse(JSON.stringify(axiosError.response.data)).status,
          code: axiosError.response.status.toString(),
        };
    }

    if (error instanceof Error) {
      const errorString = error.toString();
      const errorTag = 'Error: ';
      const message = errorString.slice(
        errorString.indexOf(errorTag) + errorTag.length,
        errorString.length,
      );
      return {
        message: message,
        code: '500',
      };
    }

    throw Error(`The error ${error} is not a Request Error`);
  }
}
