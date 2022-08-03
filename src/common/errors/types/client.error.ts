import { ErrorResponse } from './general.error';
import * as HTTPUtil from '../../util/request';

export class ClientRequestError extends Error {
  constructor(error: unknown, service: string) {
    const internalMessage = `Unexpected error when trying to communicate to ${service}:`;
    const data = HTTPUtil.Request.extractErrorData(
      error,
      HTTPUtil.ProviderAPI.None,
    );
    const requestError: ErrorResponse = {
      message: `${internalMessage} ${data.message}`,
      code: data.code,
    };

    super(`${JSON.stringify(requestError)}`);
  }
}
