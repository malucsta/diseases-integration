import { formatError } from 'src/common/util/formatError';
import * as HTTPUtil from '../../util/request';

export class DiseaseResponseError extends Error {
  constructor(error: Error) {
    const internalMessage = `Unexpected error returned by the Disease service: `;
    const data = HTTPUtil.Request.extractErrorData(
      error,
      HTTPUtil.ProviderAPI.Disease,
    );
    data.message = internalMessage + data.message;
    super(JSON.stringify(data));
  }
}

export class DiseaseUnexpectedResponseError extends Error {
  constructor(message: string) {
    message = formatError(message);
    super(message);
  }
}
