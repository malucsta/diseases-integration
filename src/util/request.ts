import { AxiosError } from 'axios';
import { DiseaseError } from 'src/clients/disease/errors/disease.error';

export class Request {
  public static isRequestError(error: Error): boolean {
    return !!(
      (error as AxiosError).response && (error as AxiosError).response?.status
    );
  }

  public static extractErrorData(error: unknown): DiseaseError {
    const axiosError = error as AxiosError;

    if (axiosError.response && axiosError.response.status) {
      return {
        sucess: false,
        message: JSON.stringify(axiosError.response.data),
        code: axiosError.response.status.toString(),
      };
    }
    throw Error(`The error ${error} is not a Request Error`);
  }
}
