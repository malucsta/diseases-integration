import * as HTTPUtil from '../../util/request';

export class FileResponseError extends Error {
  constructor(error: Error) {
    const internalMessage = `Unexpected error returned by the GoFile service: `;
    const data = HTTPUtil.Request.extractErrorData(
      error,
      HTTPUtil.ProviderAPI.GoFile,
    );
    data.message = internalMessage + data.message;
    super(JSON.stringify(data));
  }
}
