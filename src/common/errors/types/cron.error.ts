import * as HTTPUtil from '../../util/request';

export class CronError extends Error {
  constructor(error: unknown) {
    const internalMessage = `Unexpected error when trying to execute cron job:`;
    const data = HTTPUtil.Request.extractErrorData(
      error,
      HTTPUtil.ProviderAPI.None,
    );
    super(`${internalMessage} ${data.message}`);
  }
}
