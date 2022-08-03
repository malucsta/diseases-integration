import { AxiosError } from 'axios';
import { ErrorResponse } from 'src/common/errors/types/general.error';

export class Request {
  public static isRequestError(error: Error): boolean {
    return !!(
      (error as AxiosError).response && (error as AxiosError).response?.status
    );
  }

  public static extractErrorData(error: unknown): ErrorResponse {
    const axiosError = error as AxiosError;

    if (axiosError.response && axiosError.response.status) {
      return {
        message: JSON.stringify(axiosError.response.data),
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
