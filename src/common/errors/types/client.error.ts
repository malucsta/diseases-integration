import { ErrorResponse } from './general.error';
import * as HTTPUtil from '../../util/request';

export class ClientRequestError extends Error {
  constructor(error: unknown) {
    const internalMessage = `Unexpected error when trying to communicate to Disease.sh:`;
    const data = HTTPUtil.Request.extractErrorData(error);
    const requestError: ErrorResponse = {
      message: `${internalMessage} ${data.message}`,
      code: data.code,
    };

    super(`${JSON.stringify(requestError)}`);
  }
}
